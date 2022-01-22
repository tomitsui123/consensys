class HttpResponse {
  statusCode = 200
  data: any
  constructor(data: any, statusCode?: number) {
    this.data = data
    this.statusCode = statusCode || 200
  }
}

module.exports = HttpResponse