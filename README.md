# Touch Sistemas

## Admin

### Common Problems

- "Error: PostConfirmation failed with error User: ... is not authorized to perform:"
  Find: amplify/backend/function/touchsistemasPostConfirmation/custom-policies.json and add the correct arm

```JSON
[
  {
    "Action": ["cognito-idp:AdminAddUserToGroup", "cognito-idp:CreateGroup", "cognito-idp:GetGroup"],
    "Resource": ["arn:aws:cognito-idp:us-east-1:**********:userpool/us-east-1_**********"]
  }
]
```
