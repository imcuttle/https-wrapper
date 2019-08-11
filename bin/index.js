#!/usr/bin/env node
/**
 * @file index
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/8/11
 *
 */
var opts = require('optimist')
  .usage('Usage: $0 [--target=http://localhost:8080] [--port=3001] [--host=]')
  .string(['target'])
  .default({
    target: 'http://localhost:8080',
    host: '',
    port: 3001
  })

var argv = opts.argv

if (argv.help) {
  opts.showHelp()
} else {
  Promise.resolve()
    .then(() => {
      return require('../index')({
        ...argv
      })
    })
    .then(server => {
      server.listen(argv.port, argv.host)
    })
    .then(() => {
      console.log(
        'Https Proxy Server running on https://%s:%s, and forwards to %s',
        argv.host || '0.0.0.0',
        argv.port,
        argv.target
      )
    })
    .catch(function(err) {
      console.error(err)
      process.exit(1)
    })
}
