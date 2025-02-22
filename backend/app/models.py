import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db
from datetime import datetime, timezone

class Slack(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    project: so.Mapped[str] = so.mapped_column(sa.String(64))
    message: so.Mapped[str] = so.mapped_column(sa.String(1024))
    sender: so.Mapped[str] = so.mapped_column(sa.String(64))
    sent_at: so.Mapped[datetime] = so.mapped_column(
        sa.DateTime,
        server_default=sa.func.now()
    )
    status: so.Mapped[str] = so.mapped_column(
        sa.String(64),
        default="unread"
    )
    created_at: so.Mapped[datetime] = so.mapped_column(
        sa.DateTime,
        default=lambda: datetime.now(timezone.utc),
        server_default=sa.func.now()
    )