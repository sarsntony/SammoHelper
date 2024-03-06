#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SammoHelperCdkStack } from '../lib/sammo_helper_cdk_stack';
import { ReactStack } from '../lib/react_stack';

const app = new cdk.App();
const env  = { account: '529876795183', region: 'us-east-1' };
const stackProps = {
  env: env
}
new SammoHelperCdkStack(app, 'SammoHelperCdkStack', stackProps);
new ReactStack(app, 'ReactStack', stackProps);
app.synth();