﻿var parseXml;

if (typeof window.DOMParser != "undefined") {
    parseXml = function (xmlStr) {
        return new window.DOMParser().parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function (xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}

function CaptureFingureMorpho(callback) {
    var url = "https://localhost:11100/capture";


    var PIDOPTS = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"1\" fType=\"2\" iCount=\"\" iType=\"\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"10000\" otp=\"\" wadh="" posh=\"\"/>' + '</PidOptions>';


    var piddata = '';
    /*
    format=\"0\"     --> XML
    format=\"1\"     --> Protobuf
    */
    var xhr;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        //IE browser
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        //other browser
        xhr = new XMLHttpRequest();
    }

    xhr.open('CAPTURE', url, true);
    xhr.setRequestHeader("Content-Type", "text/xml");
    xhr.setRequestHeader("Accept", "text/xml");

    xhr.onreadystatechange = function () {
       
        if (xhr.readyState == 4) {
            var status = xhr.status;
          
            if (status == 200) {
                var test1 = xhr.responseText;
                var test2 = test1.search("errCode");
                var test6 = getPosition(test1, '"', 2);
                var test4 = test2 + 9;
                var test5 = test1.slice(test4, test6);
                if (test5 > 0) {
                    piddata = xhr.responseText;

                }
                else {
                    piddata = xhr.responseText;
                    var xmlDoc = parseXml(piddata);
                    var devicecode = '';
                    var modelid = '';
                    var rdsid = '';
                    var dpid = '';
                    var ci = '';

                    var himacdata = '';
                    var pidata = '';
                    var rdpublickey = '';
                    var skeyvalue = '';

                    var skeyelem = xmlDoc.getElementsByTagName("Skey")[0];
                    if (skeyelem) {
                        var civalue = skeyelem.getAttribute("ci");

                        if (civalue != '') {
                            ci = civalue;
                        }
                        skeyvalue = skeyelem.childNodes[0].nodeValue + '';
                    }


                    var deviceinfo = xmlDoc.getElementsByTagName("DeviceInfo")[0];

                    if (deviceinfo) {
                        var devalue = deviceinfo.getAttribute("dc");
                        var mivalue = deviceinfo.getAttribute("mi");
                        var rdsvalue = deviceinfo.getAttribute("rdsId");
                        var dpidvalue = deviceinfo.getAttribute("dpId");
                        var rdpublicvalue = deviceinfo.getAttribute("mc");

                        if (devalue != '') {
                            devicecode = devalue;
                        }
                        if (mivalue != '') {
                            modelid = mivalue;
                        }
                        if (rdsvalue != '') {
                            rdsid = rdsvalue;
                        }
                        if (dpidvalue != '') {
                            dpid = dpidvalue;
                        }
                        if (rdpublicvalue != '') {
                            rdpublickey = rdpublicvalue;
                        }
                    }

                    var himacataelem = xmlDoc.getElementsByTagName("Hmac")[0];

                    if (himacataelem) {
                        himacdata = himacataelem.childNodes[0].nodeValue + '';
                    }

                    var pidataelem = xmlDoc.getElementsByTagName("Data")[0];

                    if (pidataelem) {
                        pidata = pidataelem.childNodes[0].nodeValue + '';
                    }
                   alert("Captured Successfully");
                }
                var callBackString = {};
                if(devicecode==undefined)
                {
                    callBackString.devicecode = "";
                    callBackString.modelid = "";
                    callBackString.rdsid = "";
                    callBackString.dpid = "";
                    callBackString.ci = "";
                    callBackString.capturestatus = 0;
                    callBackString.himacdata = "";
                    callBackString.pidata = "";
                    callBackString.rdpublickey = "";
                    callBackString.skeyvalue = "";
                }
               else{
                callBackString.devicecode = devicecode;
                callBackString.modelid = modelid;
                callBackString.rdsid = rdsid;
                callBackString.dpid = dpid;
                callBackString.ci = ci;
                callBackString.capturestatus = 1;
                callBackString.himacdata = himacdata;
                callBackString.pidata = pidata;
                callBackString.rdpublickey = rdpublickey;
                callBackString.skeyvalue = skeyvalue;
               }

                if (callback) callback(callBackString);

               
            } else {
                var callBackString = {};
                callBackString.devicecode = "";
                callBackString.modelid = "";
                callBackString.rdsid = "";
                callBackString.dpid = "";
                callBackString.ci = "";
                callBackString.capturestatus = 0;
                callBackString.himacdata = "";
                callBackString.pidata = "";
                callBackString.rdpublickey = "";
                callBackString.skeyvalue = "";
                if (callback) callback(callBackString);
            }
        }

    };

    xhr.send(PIDOPTS);
}

function GetMorphoRDService(callback) {

    var url = "https://localhost:11100";


    var rdservicestatus = 0;
    var xhr;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        //IE browser
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        //other browser
        xhr = new XMLHttpRequest();
    }
    xhr.open('RDSERVICE', url, true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status == 200) {
                rdservicestatus = 1;
                var callBackString = {};
                callBackString.rdservicestatus = rdservicestatus;
                callBackString.DeviceName = "MORPHO";
                if (callback) callback(callBackString);
            } else {
                console.log(xhr.response);
            }
        }
    };
    xhr.send();
}




function GetMorphoRDDeviceInfo(callback) {
    var url = "https://localhost:11100/getDeviceInfo";

    var deviceinfostatus = 0;

    var xhr;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        //IE browser
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        //other browser
        xhr = new XMLHttpRequest();
    }

    //
    xhr.open('DEVICEINFO', url, true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            var status = xhr.status;

            if (status == 200) {
                var xmlstr = xhr.responseText;

                var xmlDoc = parseXml(xmlstr);
                var addinfo = xmlDoc.getElementsByTagName("additional_info")[0];

                var serialno = '';
                var ml1data = addinfo.getElementsByTagName("Param")[0];

                serialno = ml1data.getAttribute("value");

                var addinfoNodes;
                if (serialno == '') {
                    addinfoNodes = addinfo.childNodes;
                }

                var rdversion = '';

                var deviceinfo = xmlDoc.getElementsByTagName("DeviceInfo")[0];

                if (deviceinfo) {
                    var value = deviceinfo.getAttribute("rdsVer");

                    if (value != '') {
                        rdversion = value;
                    }
                }
                if (serialno == '') {
                    if (addinfoNodes) {
                        for (var i = 0; i < addinfoNodes.length; i++) {

                            var nameval = addinfoNodes[i].getAttribute("name");
                            var value = addinfoNodes[i].getAttribute("value");

                            if (value != '') {
                                deviceinfostatus = 1;
                                serialno = value;
                            }
                        }
                    }
                }
                else {
                    deviceinfostatus = 1;
                }

                var callBackString = {};
                callBackString.Rdversion = rdversion;
                callBackString.serialno = serialno;
                callBackString.deviceinfostatus = deviceinfostatus;
                if (callback) callback(callBackString);

            } else {

                var callBackString = {};
                callBackString.Rdversion = "";
                callBackString.serialno = "";
                callBackString.deviceinfostatus = 0;
                if (callback) callback(callBackString);

            }
        }

    };

    xhr.send();

    return deviceinfostatus;
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

function GetMantraRDService(callback) {
    var SuccessFlag = 0;
    var primaryUrl = "http://127.0.0.1:";

    try {
        var protocol = window.location.href;
        if (protocol.indexOf("https") >= 0) {
            primaryUrl = "https://127.0.0.1:";
        }
    } catch (e) { }


    var OldPort = false;
    for (var i = 11100; i <= 11120; i++) {
        if (primaryUrl == "http://127.0.0.1:" && OldPort) {
            i = "8005";
        }

        var verb = "RDSERVICE";
        var err = "";
        SuccessFlag = 0;
        var res;
        $.support.cors = true;
        var httpStaus = false;
        var jsonstr = "";
        var data = new Object();
        var obj = new Object();

        $.ajax({
            type: "RDSERVICE",
            async: false,
            crossDomain: true,
            url: primaryUrl + i.toString(),
            contentType: "text/xml; charset=utf-8",
            processData: false,
            cache: false,
            crossDomain: true,
            success: function (data) {
                httpStaus = true;
                res = { httpStaus: httpStaus, data: data };
                finalUrl = primaryUrl + i.toString();
                var $doc = $.parseXML(data);
                var CmbData1 = $($doc).find('RDService').attr('status');
                var CmbData2 = $($doc).find('RDService').attr('info');
                if (RegExp('\\b' + 'Mantra' + '\\b').test(CmbData2) == true) {

                    SuccessFlag = 1;
                }
            },
            error: function (jqXHR, ajaxOptions, thrownError) {
                if (i == "8005" && OldPort) {
                    OldPort = false;
                    i = "11099";
                }
            },

        });

        if (SuccessFlag == 1) {
            break;
        }
    }

    if (callback) callback(SuccessFlag);

}


function CaptureFingureByMantra(wadh, callback) {
    var finalUrl = "http://127.0.0.1:11100/rd/capture";

    var XML = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0" pCount="0" pgCount="2" format="0"   pidVer="2.0" timeout="10000" pTimeout="20000"  wadh="' + wadh + '" posh="UNKNOWN" env="P" /> <CustOpts><Param name="mantrakey" value="" /></CustOpts> </PidOptions>';

    var verb = "CAPTURE";
    var err = "";

    var res;
    $.support.cors = true;
    var httpStaus = false;
    var jsonstr = "";
    $.ajax({
        type: "CAPTURE",
        async: false,
        crossDomain: true,
        url: finalUrl,
        data: XML,
        contentType: "text/xml; charset=utf-8",
        processData: false,
        success: function (data) {
            httpStaus = true;
            res = { httpStaus: httpStaus, data: data };
            //piddata = data;
            //console.log(piddata);
            var $doc = $.parseXML(data);
            var Message = $($doc).find('Resp').attr('errCode');
            if (Message == "0") {
                piddata = data;
            }
            else {
                piddata = ""
            }

        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            alert(thrownError);
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });

    if (callback) callback(piddata);
}

function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
        err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
        err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
        err = 'Time out error';
    } else if (thrownError === 'abort') {
        err = 'Ajax request aborted';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}