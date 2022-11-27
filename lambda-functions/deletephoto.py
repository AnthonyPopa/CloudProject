import json
import boto3  
import time
import datetime

REGION="us-east-1"
dynamodb = boto3.resource('dynamodb',region_name=REGION)
table = dynamodb.Table('PhotoGallery')

def lambda_handler(event, context):
    photoID=event['params']['path']['id']
    
    item = table.get_item(
        Key={
            'PhotoID': str(photoID),
            'CreationTime': int(photoID)
        }
    )

    table.delete_item(
        Key={
            'PhotoID': str(photoID),
            'CreationTime': int(photoID)
        }
    )

    response = {
        "statusCode": 200,
        "body": item
    }

    return response
