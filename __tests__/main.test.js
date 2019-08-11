/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const httpsWrapper = require('../')
const request = require('supertest')
const http = require('http')
const express = require('express')

const target = 'http://localhost:23456'
const app = express()

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' })
})

describe('httpsWrapper', function() {
  beforeAll(() => {
    return new Promise((resolve, reject) => {
      const server = http.createServer(app).listen(23456, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })

      app.close = () => {
        server.close()
      }
    })
  })

  afterAll(() => {
    app.close()
  })

  it('should spec', async function() {
    const httpsServer = await httpsWrapper({ target })
    return request(httpsServer.web.bind(httpsServer))
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
  })
})
