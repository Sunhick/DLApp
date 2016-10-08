#!/bin/sh

# !! Don't modify this file !!
#
# Author: Sunil <sunhick@gmail.com>
# Desc: Connect thru' ssh to AWS instance
# Copyright (c) 2016. University of Colorado, boulder
# 

AWS="ec2-54-213-113-154.us-west-2.compute.amazonaws.com"
ssh -i ~/Downloads/SunilAWS01.pem ubuntu@$AWS