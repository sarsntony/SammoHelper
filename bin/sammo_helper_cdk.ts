#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SammoHelperCdkStack } from '../lib/sammo_helper_cdk_stack';
import { ReactStack } from '../lib/react_stack';

const app = new cdk.App();
new SammoHelperCdkStack(app, 'SammoHelperCdkStack');
new ReactStack(app, 'ReactStack');
app.synth();