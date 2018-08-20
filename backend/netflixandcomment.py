from app import app


# Run the application
if __name__ == '__main__':
    import logging
    from logging.handlers import RotatingFileHandler

    handler = RotatingFileHandler('logs/post-comment.log',
                                  maxBytes=10000,
                                  backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO)

    app.run(debug=True, threaded=True)
