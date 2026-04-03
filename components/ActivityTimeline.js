"use client";

export default function ActivityTimeline({ activities }) {
  return (
    <div className="card">
      <h2>Activity Timeline</h2>
      {activities.length === 0 ? (
        <p>No activities yet.</p>
      ) : (
        <ul className="timeline">
          {activities.map((activity) => (
            <li key={activity.id}>
              <p>{activity.note}</p>
              <small>{new Date(activity.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
