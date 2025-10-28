from typing import Union
from datetime import datetime
from fastapi import FastAPI
app = FastAPI()


@app.get("/")
def health_check():
    """Simple health check"""
    return {
        "status": "HEALTHY",
        "current_time": datetime.utcnow().isoformat()
    }


