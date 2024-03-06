import { Construct } from 'constructs';
import { Stack, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { Distribution, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Certificate, CertificateValidation, ValidationMethod } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';

const path = './resources/build';

export class ReactStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const SAMMO_HELPER_DOMAIN = 'sammo-helper.sars-lee.com';

    const hostingBucket = new Bucket(this, 'ReactBucket', {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const certificate = new Certificate(this, 'SammoHelperCertificate', {
      domainName: SAMMO_HELPER_DOMAIN,
      validation: CertificateValidation.fromDns(),
    });

    const distribution = new Distribution(this, 'CloudfrontDistribution', {
      certificate: certificate,
      defaultBehavior: {
        origin: new S3Origin(hostingBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [
        SAMMO_HELPER_DOMAIN
      ],
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    new BucketDeployment(this, 'BucketDeployment', {
      sources: [Source.asset(path)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}