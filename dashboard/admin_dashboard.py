import streamlit as st
import pandas as pd
import json
import plotly.express as px
import os

st.set_page_config(
    page_title="Developer Dashboard",
    layout="wide"
)

st.title("🚀 Python Playground Analytics")

# Locate analytics_data.json safely
file_path = os.path.join(os.path.dirname(__file__), "..", "analytics_data.json")

# Load analytics data
try:
    with open(file_path) as f:
        data = json.load(f)
except:
    data = []

if len(data) == 0:
    st.warning("No analytics data found.")
    st.stop()

df = pd.DataFrame(data)

# Convert time column
df["time"] = pd.to_datetime(df["time"])

# -------------------------
# METRICS
# -------------------------

col1, col2 = st.columns(2)

col1.metric("Total Visits", len(df))
col2.metric("Unique Pages", df["page"].nunique())

st.divider()

# -------------------------
# PAGE VISITS BAR CHART
# -------------------------

st.subheader("📊 Page Visits")

page_counts = df["page"].value_counts().reset_index()
page_counts.columns = ["page", "visits"]

fig_bar = px.bar(
    page_counts,
    x="page",
    y="visits",
    color="page",
    title="Page Visit Counts"
)

st.plotly_chart(fig_bar, use_container_width=True)

# -------------------------
# PAGE DISTRIBUTION PIE
# -------------------------

st.subheader("🥧 Page Distribution")

fig_pie = px.pie(
    page_counts,
    names="page",
    values="visits",
    title="Traffic Distribution"
)

st.plotly_chart(fig_pie, use_container_width=True)

# -------------------------
# DAILY TRAFFIC
# -------------------------

st.subheader("📅 Daily Traffic")

daily = df.groupby(df["time"].dt.date).size().reset_index(name="visits")

fig_line = px.line(
    daily,
    x="time",
    y="visits",
    markers=True,
    title="Visits Over Time"
)

st.plotly_chart(fig_line, use_container_width=True)

# -------------------------
# RECENT ACTIVITY
# -------------------------

st.subheader("🧾 Recent Activity")

recent = df.sort_values("time", ascending=False)

st.dataframe(recent)

# -------------------------
# DOWNLOAD LOGS
# -------------------------

st.subheader("⬇ Download Analytics")

st.download_button(
    "Download Logs",
    df.to_csv(index=False),
    file_name="analytics_logs.csv",
    mime="text/csv"
) 
