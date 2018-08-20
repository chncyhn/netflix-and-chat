from locust import HttpLocust, TaskSet, task
import random
import string


class UserBehavior(TaskSet):

    @task(1)
    def post_comment(self):

        rand_track = random.randint(1024462669, 9024462669)
        rand_text = ''.join(random.choice(string.ascii_letters) 
                            for _ in range(random.randint(5, 100)))

        payload = {"name": "Debugboy", 
                   "track_id": rand_track, 
                   "track_name": "Debug", 
                   "text": rand_text}

        self.client.post("/comment", json=payload)
        self.client.get(f"/comment/{rand_track}")

    @task(5)
    def get_comment(self):
        rand_track = random.randint(1024462669, 9024462669)
        self.client.get(f"/comment/{rand_track}")


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
