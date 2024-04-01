from sched import scheduler
import time
import threading
import firebase_admin
from firebase_admin import credentials, firestore

# class Firebase():
#     cred = credentials.Certificate('site_content/creds/cred-firebase-adminsdk.json')
#     fireapp = firebase_admin.initialize_app(cred)
#     db = firestore.client()

class Firebase():
    def __init__(self) -> None:
        cred = credentials.Certificate('site_content/creds/cred-firebase-adminsdk.json')
        fireapp = firebase_admin.initialize_app(cred)
        self.db = firestore.client()

        scheduler_thread = threading.Thread(target=self.refresh_connection)
        scheduler_thread.start()
        
    def refresh_connection(self):
        """
        Every 90 seccond reads data from firebase to keep session alive,
        which eliminates the long loading time.
        """
        while True:
            self.db.collection('refresh').document('_').get().to_dict()
            time.sleep(60)


firebase_instance = Firebase()