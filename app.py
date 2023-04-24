import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


# Database Setup
engine = create_engine("postgresql://postgres:Limbo%40123@localhost:5432/project_3")





#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/stations.json")
def summary():
    results = engine.execute("SELECT * FROM stations order by id limit 500" )
    return jsonify([dict(_) for _ in results])


if __name__ == '__main__':
    app.run(debug=True)
