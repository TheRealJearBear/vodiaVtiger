//Incoming call begins to ring...
function oncallreceived(data) {
  console.log(JSON.stringify(data));
  var clientNumberBefore = data.call.from;
  var clientNumberMiddle = clientNumberBefore.split(":")[1];
  var clientNumber = clientNumberMiddle.split("@")[0];
  var agent = data.leg.ext;
  var key = loadIntr(data.call.domain, "", "token", false);
  var addDomain = loadIntr(data.call.domain, "", "addDomain", false);
  console.log("addDomain is: " + addDomain);
  var url = "https://" + addDomain + "/modules/PhoneCalls/callbacks/Generic.php?from="+clientNumber+"&to="+agent+"&event=call_initiated&call_id="+data.call.id+"&direction=inbound"
  var receiveCall = {
    method: 'POST',
    header: [{name: "X-VTIGER-SECRET", value: key}],
    url: url,
    callback: function(response){
    }
  };
  var call = data.call._id;
  var info = {
    number: clientNumber,
    agent: data.leg.ext,
    urlToFront: "https://" + addDomain + "/modules/PhoneCalls/callbacks/Search.php?phone_number=" + clientNumber
  }
  system.http(receiveCall);
  console.log("here is the urltofront: " + info.urlToFront + "here is the info: " + JSON.stringify(info));
  system.setCallInfo(call, info);
}

//incoming call is connected with agent...
function oncallanswered(data) {
  var clientNumberBefore = data.call.from;
  var clientNumberMiddle = clientNumberBefore.split(":")[1];
  var clientNumber = clientNumberMiddle.split("@")[0];
  var agent = data.leg.ext;
  var key = loadIntr(data.call.domain, "", "token", false);
  var url = "https://vodiatiger.od2.vtiger.com/modules/PhoneCalls/callbacks/Generic.php?from="+clientNumber+"&to="+agent+"&event=call_connected&call_id="+data.call.id;
  var callAnswered = {
    method: 'POST',
    header: [{name: "X-VTIGER-SECRET", value: key}],
    url: url,
    callback: function(response){
    }
  };
  system.http(callAnswered);
}

//incoming call that is answered is hungup normally...
function oncallhungup(data) {
  var key = loadIntr(data.call.domain, "", "token", false);
  var url = "https://vodiatiger.od2.vtiger.com/modules/PhoneCalls/callbacks/Generic.php?call_id="+data.call.id+"&event=call_hangup&hangup_reason=completed";
  var callHungup = {
    method: 'POST',
    header: [{name: "X-VTIGER-SECRET", value: key}],
    url: url,
    callback: function(response){
    }
  };
  system.http(callHungup);
}

//incoming call that is missed...
function oncallmissed(data) {
  var key = loadIntr(data.call.domain, "", "token", false);
  var url = "https://vodiatiger.od2.vtiger.com/modules/PhoneCalls/callbacks/Generic.php?call_id="+data.call.id+"&event=call_hangup&hangup_reason=no_answer";
  var callMissed = {
    method: 'POST',
    header: [{name: "X-VTIGER-SECRET", value: key}],
    url: url,
    callback: function(response){
    }
  };
  system.http(callMissed);
}
