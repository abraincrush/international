from flask import Flask, jsonify
from flask_cors import CORS

# 初始化 Flask 应用
app = Flask(__name__)
# 使用 CORS，允许所有来源的跨域请求，这在开发阶段很方便
CORS(app)

# 定义一个简单的 API 路由
@app.route("/api/hello")
def hello_world():
    # 返回一个 JSON 对象
    return jsonify(message="Hello from Flask Backend!")

# 当直接运行这个脚本时，启动开发服务器
if __name__ == '__main__':
    app.run(debug=True)