from imdb import IMDb
from app import cache

ia = IMDb()

@cache.memoize()
def fetch_imdb_rating(track_name):
    """
    Request the rating of a track from IMDB.
    Returns the rating as a string.
    """
    movie = ia.search_movie(track_name, results=1)[0]
    movie = ia.get_movie(movie.movieID)

    return movie['rating']
