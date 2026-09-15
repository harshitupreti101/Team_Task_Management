from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

database_options = {}
if settings.DATABASE_URL.startswith("sqlite"):
    database_options["connect_args"] = {"check_same_thread": False}
engine = create_engine(settings.DATABASE_URL, **database_options)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()