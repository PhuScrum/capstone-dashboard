class Config(object):
    DEBUG = True
    TESTING = False
    CLOUD_STORAGE_BUCKET = 'capstone_rmit_2020'
    GOOGLE_APPLICATION_CREDENTIALS = 'config.json'
    KEY = "fadsfa"


class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = True
