# import json
import time
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials


class ValidateToken:

    cred = credentials.Certificate('users_progress/creds/cred-firebase-adminsdk.json')

    @staticmethod
    def decode(raw_token: str):
        try:
            temp_app = firebase_admin.initialize_app(
                ValidateToken.cred, name=f"{time.time()}")

            # Verify the ID token while checking if the token is revoked by
            # passing check_revoked=True.
            token = raw_token.split(' ')[1]
            decoded_token = auth.verify_id_token(
                token, check_revoked=True, app=temp_app)

            # Token is valid and not revoked.
            return decoded_token

        except ValueError as err:
            # Token was not a string or was empty.
            print(err)
            return 'Value Error'
        except auth.ExpiredIdTokenError:
            # Token is expired
            return 'The token is expired.'
        except auth.RevokedIdTokenError:
            # Token has been revoked
            return 'The token has been revoked.'
        except auth.InvalidIdTokenError:
            # Token is invalid
            return 'The token is invalid.'
        except auth.CertificateFetchError:
            # Could not fetch the certificates required to verify the token
            return 'Could not fetch the certificates required to verify the token.'