import s3 from "aws-sdk/clients/s3";
import filenamifyUrl from "filenamify-url";

const {
  EXTRACT_CSS_S3_BUCKET_NAME,
  EXTRACT_CSS_S3_BUCKET_ACCESS_KEY_ID,
  EXTRACT_CSS_S3_BUCKET_SECRET_ACCESS_KEY
} = process.env;

const storage = new s3({
  params: {
    Bucket: EXTRACT_CSS_S3_BUCKET_NAME
  },
  accessKeyId: EXTRACT_CSS_S3_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: EXTRACT_CSS_S3_BUCKET_SECRET_ACCESS_KEY
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
