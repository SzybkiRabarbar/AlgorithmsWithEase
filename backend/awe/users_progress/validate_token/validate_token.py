# import json
# import firebase_admin
from firebase_admin import auth


class ValidateToken:

    # with open('users_progress/creds/identity-platform.json', 'r') as file:
    #     content  = json.load(file)
    #     CLIENT_ID = content['clientId']

    # with open('users_progress/creds/cred-firebase-adminsdk.json', 'r') as file:
    #     content = json.load(file)
    #     CLIENT_ID = content['client_id']

    @staticmethod
    def decode(raw_token: str):
        try:
            # Verify the ID token while checking if the token is revoked by
            # passing check_revoked=True.
            token = raw_token.split(' ')[1]
            decoded_token = auth.verify_id_token(
                token, check_revoked=True)

            # Token is valid and not revoked.
            return decoded_token

        except ValueError:
            # Token was not a string or was empty.
            return 'The token was not a string or was empty.'
        except auth.InvalidIdTokenError:
            # Token is invalid
            return 'The token is invalid.'
        except auth.ExpiredIdTokenError:
            # Token is expired
            return 'The token is expired.'
        except auth.RevokedIdTokenError:
            # Token has been revoked
            return 'The token has been revoked.'
        except auth.CertificateFetchError:
            # Could not fetch the certificates required to verify the token
            return 'Could not fetch the certificates required to verify the token.'