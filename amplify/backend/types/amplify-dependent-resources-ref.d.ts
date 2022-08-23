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
    "api": {
        "touchsistemasadminGraphQL": {
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
    "storage": {
        "touchsistemasadminStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "touchsistemasadmintouchsistemasadminLambdaLayer": {
            "Arn": "string"
        },
        "touchsistemasadminEventsGetByID": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasadminEventsGetLogoByID": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasadminEventsVisitorsSetPhone": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasadminEventsVisitorsConfirmCode": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasadminEventsVisitorsPoDGetByPhone": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "touchsistemasListPlans": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}