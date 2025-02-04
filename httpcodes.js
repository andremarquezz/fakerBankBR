const httpcodes = {
  0: {
    code: 'Not Error',
    why: 'Default message to default response from code.',
  },
  100: {
    code: 'Continue',
    why: "It's a temporary answer, it means no problem and the script will continue or will be ignored if it's already finished.",
  },
  101: {
    code: 'Switching Protocols',
    why: 'This means that the code is changing the access protocol.',
  },
  102: {
    code: 'Processing',
    why: 'The server received the request and is working on it, but still have no response.',
  },
  103: {
    code: 'Early Hints',
    why: 'The agent needs to preload resources until the server creates a response.',
  },
  200: {
    code: 'OK',
    why: 'The request is OK, this response depends on the HTTP method used.',
  },
  201: {
    code: 'Created',
    why: 'The request is OK and a new resource was created, it is usually sent in POST methods',
  },
  202: {
    code: 'Accepted',
    why: 'The request is OK, but no action was taken, this can happen when the server handles batch processing, or redirects to other locations.',
  },
  203: {
    code: 'Non-Authoritative Information',
    why: 'The request is OK, but the response is not the exact response from the server and is from third-party or local copies.',
  },
  204: {
    code: 'No Content',
    why: 'The request is OK but no response, maybe headers could be useful.',
  },
  205: {
    code: 'Reset Content',
    why: 'The request is OK, this code means that the server received and made the request, but wants to reset the document view, sending the original state of the origin server.',
  },
  206: {
    code: 'Partial Content',
    why: 'The request is OK, the body contains the byte sequence of the data based on the range header, basically it is the partial data received from the request.',
  },
  207: {
    code: 'Multi-Status',
    why: 'The request may be OK, there are multiple status codes in the body, which means you need to check the body of the multi-status response for more information.',
  },
  208: {
    code: 'Already Reported',
    why: 'This means that requests are a collection of repeated requests, of which only one received as 200, usually means that the request discovered a loop.',
  },
  226: {
    code: 'IM Used',
    why: 'The request is OK, but the response is the same as one or more results from the instance, usually it means the instance is cached.',
  },
  300: {
    code: 'Multiple Choices',
    why: 'This means that the answer has several options, the user has to choose one of them, but there is no standard method for choosing.',
  },
  301: {
    code: 'Moved Permanently',
    why: 'The code means the URI was changed, maybe the new URI was sent in the body.',
  },
  302: {
    code: 'Found',
    why: 'This means that the URI has been changed temporarily and in the future it may be changed permanently, but you must use the same URI for now.',
  },
  303: {
    code: 'See Other',
    why: 'The server instructed you to get the answer from another server.',
  },
  304: {
    code: 'Not Modified',
    why: "This code is used when the server says the response hasn't changed and the user can use the same response from the cache.",
  },
  305: {
    code: 'Use Proxy',
    why: 'This means that the user has to use a proxy to access that server and get the response, this code is obsolete.',
  },
  306: {
    code: 'Unused',
    why: 'This code is obsolete but can be found and used in the old HTTP version 1.1',
  },
  307: {
    code: 'Temporary Redirect',
    why: "It's similar to 302 code, the server tells the user to get the response from other servers, but using the same method.",
  },
  308: {
    code: 'Permanent Redirect',
    why: 'It is similar to 301 code, the server informs the user that it has permanently changed and needs to get the response from another server, but using the same method.',
  },
  400: {
    code: 'Bad Request',
    why: 'The servers did not recognize the request because it contains invalid syntax.',
  },
  401: {
    code: 'Unauthorized',
    why: 'The user is not allowed to access the server, the user needs to authenticate to get the response.',
  },
  402: {
    code: 'Payment Required',
    why: "This code will be used in the future (or now), the purpose is to use it in payment requests, but it doesn't seem to be used currently.",
  },
  403: {
    code: 'Forbidden',
    why: 'Similar to 401 code, but this means that the server recognizes the user, but he still does not have permission to access the content, causing the server to refuse access.',
  },
  404: {
    code: 'Not Found',
    why: "This famous code means the resource cannot be found, it means the server doesn't have the answer, URL or something needed.",
  },
  405: {
    code: 'Method Not Allowed',
    why: 'The server recognizes this method but is disabled, which means the user needs to use another method, usually GET and HEAD work.',
  },
  406: {
    code: 'Not Acceptable',
    why: "This code means that the server tried to find the answer based on the user's criteria, but no content was found.",
  },
  407: {
    code: 'Proxy Authentication Required',
    why: 'Similar to 401 or 305, but means authentication needs to be done via proxy.',
  },
  408: {
    code: 'Request Timeout',
    why: 'Another famous code, this means that the request has timed out, normally the request is idle and the server takes it down.',
  },
  409: {
    code: 'Conflict',
    why: 'This code is sent when the server conflicts with the sent request.',
  },
  410: {
    code: 'Gone',
    why: 'This means that the server permanently deleted the content, with no redirect address, usually used in time limited resources.',
  },
  411: {
    code: 'Length Required',
    why: "The server rejected the request because the user needs to set the 'Content-Length' header.",
  },
  412: {
    code: 'Precondition Failed',
    why: 'The headers do not have the necessary conditions to access the server.',
  },
  413: {
    code: 'Payload Too Large',
    why: "The request has a large payload that is greater than the server limit, the server may close the request or return a 'Retry-After' header.",
  },
  414: {
    code: 'URI Too Long',
    why: 'The server received a URI much larger than the limit.',
  },
  415: {
    code: 'Unsupported Media Type',
    why: "The server doesn't support the media format type, so it closed the request.",
  },
  416: {
    code: 'Range Not Satisfiable',
    why: "It usually means that the URI does not have the satisfiable range, which needs to be defined in the 'Range' header.",
  },
  417: {
    code: 'Expectation Failed',
    why: "It means the 'Expect' header cannot be satisfied by the server.",
  },
  418: {
    code: "I'm a Teapot",
    why: 'The server refuses the attempt to brew coffee in a teapot.',
  },
  421: {
    code: 'Misdirected Request',
    why: 'Request redirected from server to another server which cannot send a response, user can try again to see if the request works.',
  },
  422: {
    code: 'Unprocessable Entity',
    why: 'The request was well formed but is disabled due to some semantic errors.',
  },
  423: {
    code: 'Locked',
    why: 'The request attempted to access some blocked server resource.',
  },
  424: {
    code: 'Failed Dependency',
    why: 'The request failed because of some previous request.',
  },
  425: {
    code: 'Too Early',
    why: "The server doesn't want to make the request because it can be redone.",
  },
  426: {
    code: 'Upgrade Required',
    why: 'The server refused the request made by this method, but this will be done after the user changes the request method, maybe the header includes the required method.',
  },
  428: {
    code: 'Precondition Required',
    why: "The server wants the response to be conditional, this is used to block access to the server to avoid 'Update lost' error when the server can be modified by third party people.",
  },
  429: {
    code: 'Too Many Requests',
    why: 'Another famous error, this one is sent when the user has made too many requests in a short time.',
  },
  431: {
    code: 'Request Header Fields Too Large',
    why: 'The server refuses the request because the header fields are too large, can be fixed by reducing the header fields and trying again.',
  },
  451: {
    code: 'Unavailable For Legal Reasons',
    why: 'The user requested some illegal content that was censored by the government.',
  },
  500: {
    code: 'Internal Server Error',
    why: 'The server cannot complete the request due to some internal error that it cannot fix on its own.',
  },
  501: {
    code: 'Not Implemented',
    why: "It means the server doesn't support the method, usually the default methods are 'GET' and 'HEAD', try with one of them.",
  },
  502: {
    code: 'Bad Gateway',
    why: 'The server received an invalid response due to an error with the gateway.',
  },
  503: {
    code: 'Service Unavailable',
    why: 'Another famous error, the server is not available, usually means the server is under maintenance or overloaded, it usually includes a header explaining when to try again and the warning about the error.',
  },
  504: {
    code: 'Gateway Timeout',
    why: 'This code means that the server is working with the gateway and cannot send a response in time.',
  },
  505: {
    code: 'HTTP Version Not Supported',
    why: "This means that the user's HTTP version is not supported by this server.",
  },
  506: {
    code: 'Variant Also Negotiates',
    why: 'The server has an internal configuration error, it usually means the server referenced a circular request.',
  },
  507: {
    code: 'Insufficient Storage',
    why: 'The server has an internal configuration error, it usually means that the server is configured to initiate a content request with itself, or that it does not have enough operating space.',
  },
  508: {
    code: 'Loop Detected',
    why: 'The server detected some internal loop on request.',
  },
  509: {
    code: 'Bandwidth Limit Exceeded',
    why: 'The server has the maximum access traffic assigned.',
  },
  510: {
    code: 'Not Extended',
    why: 'The server requires post-request extensions to handle the request.',
  },
  511: {
    code: 'Network Authentication Required',
    why: 'This code means that the user needs to authenticate himself to have access to some network.',
  },
};

module.exports = httpcodes;
