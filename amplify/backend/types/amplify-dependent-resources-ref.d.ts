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
        }
    },
    "storage": {
        "touchsistemasadminStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}