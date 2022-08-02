export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "clientsGroupRole": "string",
            "adminsGroupRole": "string"
        },
        "touchsistemas": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "touchsistemasPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    },
    "api": {
        "touchsistemas": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "s3touchsistemasstoragefiles": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}