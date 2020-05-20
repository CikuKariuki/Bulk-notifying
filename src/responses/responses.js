export default function makeResponses ({}) {
    return Object.freeze({
      successResponse,
      unAuthorizedResponse,
      serverErrorResponse,
      inputErrorResponse,
      notFoundErrorResponse,
      preconditionsNotFulfilledResponse
    })
  
    function successResponse(message, code = "200"){
      return Object.freeze({
          "status" : code,
          "message" : message
      })
    }
  
  function unAuthorizedResponse(message, code = "401") {
      return Object.freeze({
          "status" : code,
          "message" : message
      })
  }
  
  function serverErrorResponse(message, code = "500") {
    return Object.freeze({
        "status" : code,
        "message" : message
    })
  }
  
  function inputErrorResponse(message, code = "400") {
    return Object.freeze({
        "status" : code,
        "message" : message
    })
  }
  
  function notFoundErrorResponse(message, code = "404") {
    return Object.freeze({
        "status" : code,
        "message" : message
    })
  }
  
  function preconditionsNotFulfilledResponse(message, code = "412") {
    return Object.freeze({
        "status" : code,
        "message" : message
    })
  } 
  }
  