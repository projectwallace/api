import s3 from "aws-sdk/clients/s3";
import filenamifyUrl from "filenamify-url";

const {
  EXTRACT_CSS_S3_BUCKET_NAME,
  EXTRACT_CSS_S3_BUCKET_ACCESS_KEY_ID,
  EXTRACT_CSS_S3_BUCKET_SECRET_ACCESS_KEY
} = process.env;

process.env.AWS_ACCESS_KEY_ID = EXTRACT_CSS_S3_BUCKET_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = EXTRACT_CSS_S3_BUCKET_SECRET_ACCESS_KEY;

const storage = new s3({
  params: { Bucket: EXTRACT_CSS_S3_BUCKET_NAME }
});

export default ({ filename, css }) => {
  return storage
    .putObject({
      Key: filenamifyUrl(filename) + ".css",
      Body: css,
      ContentType: "text/css"
    })
    .promise();
};
