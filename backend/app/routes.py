from flask import request, jsonify
from app.models import Comment
from app import app, db
from expletives import badwords


def create_comment_dict(comment):
    """
    Create a dictionary from a row of Comment data.
    """
    comment_data = {}
    comment_data['name'] = comment.name
    comment_data['text'] = comment.text
    comment_data['track_id'] = comment.track_id
    comment_data['date'] = comment.date.strftime('%d %b %Y, %H:%M')

    return comment_data


@app.route('/comment/all', methods=['GET'])
def get_all_comments():
    comments = Comment.query.all()
    output = []
    for comment in comments:
        comment_data = create_comment_dict(comment)
        output.append(comment_data)

    return jsonify({'comments': output})


@app.route('/comment/<track_id>', methods=['GET'])
def get_comments_of_track(track_id):
    comments = Comment.query.filter_by(track_id=track_id)

    if not comments:
        return jsonify({"message": "No comments found"})

    output = []
    for comment in comments:
        new_comment = create_comment_dict(comment)
        output.append(new_comment)

    return jsonify({"comments": output})


@app.route('/comment', methods=['POST'])
def create_comment():
    data = request.get_json()

    if any([bw in data['text'] for bw in badwords]):
        return jsonify({'message': 'Write rejected because of profanity.'})

    new_comment = Comment(name=data['name'],
                          text=data['text'],
                          track_id=data['track_id'])

    db.session.add(new_comment)
    db.session.commit()

    app.logger.info(f"trackid: {data['track_id']}, \
                      track_name: {data['track_name']}")

    return jsonify({'message': 'New comment created.'})
