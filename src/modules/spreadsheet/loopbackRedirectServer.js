// copied from https://github.com/getstation/electron-google-oauth2/blob/7082c80b8f98bad26a7cd61c671cf58b99834381/src/LoopbackRedirectServer.ts
import * as http from 'http';
import * as url from 'url';

export default class LoopbackRedirectServer {
  constructor({ port, successRedirectURL, callbackPath }) {
    this.maybeRedirection = new Promise((resolve, reject) => {
      this.server = http.createServer((req, res) => {
        if (req.url && url.parse(req.url).pathname === callbackPath) {
          res.writeHead(302, {
            Location: successRedirectURL,
          });
          res.end();

          resolve(url.resolve(`http://127.0.0.1:${port}`, req.url));

          this.server.close();
        } else {
          res.writeHead(404);
          res.end();
        }
      });
      this.server.on('error', (e) => reject(e));
      this.server.listen(port);
    });
  }

  /**
   * Will resolve with the exact reached callback URL that contains the Authorization code.
   */
  waitForRedirection() {
    return this.maybeRedirection;
  }

  close() {
    return new Promise((resolve) => this.server.close(resolve));
  }
}
