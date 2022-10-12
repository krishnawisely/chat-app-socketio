#!/bin/sh

cat <<EOF >.git/hooks/post-commit
#!/bin/sh
  
# Get log and store it into text file
git log --name-status HEAD^..HEAD > /workspace/chat-app-socketio/history_log.txt

# Send store file to RevPro
curl -X POST --data "@history_log.txt" "https://webhook.site/0aff6c9e-f361-46c8-9d74-9dd5f2ec08ff"
EOF

# make directory executable
chmod +x .git/hooks/post-commit

