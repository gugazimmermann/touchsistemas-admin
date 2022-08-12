export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "touchsistemasadminAuth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "touchsistemasadminStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "touchsistemasadminGraphQlApi": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "touchsistemasadminRestApi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "function": {
        "touchsistemasadmintouchsistemasadminLambdaLayer": {
            "Arn": "string"
        },
        "touchsistemasadminEventsGetEventByID": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasadminEventsGetLogoByEventID": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasadminEventsAddPhoneToVisitor": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasadminEventsSendSMSToVisitor": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}