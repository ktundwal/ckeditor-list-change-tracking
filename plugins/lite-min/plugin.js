﻿/*! Source version: 1.2.30
 * Copyright (C) 2016 LoopIndex - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the LoopIndex Comments CKEditor plugin license.
 * Attributions
 * Rangy library:
 * Copyright 2015, Tim Down
 * https://github.com/timdown/rangy
 * ice code:
 * based on work by Matthew DeLambo Copyright (c) The New York Times, CMS Group
 * https://github.com/NYTimes/ice
 * Opentip adapter
 * Copyright (c) 2012, Matias Meno
 * http://www.opentip.org
 * You should have received a copy of the LoopIndex Comments CKEditor plugin license with
 * this file. If not, please write to: loopindex@gmail.com, or visit http://www.loopindex.com
 * written by (David *)Frenkiel (https://github.com/imdfl)
 */
(function (a) {
    a.ice = {}
}(this || window));
(function (b, a) {
    if (typeof define == "function" && define.amd) {
        define(b)
    } else {
        if (typeof module != "undefined" && typeof exports == "object") {
            module.exports = b()
        } else {
            a.rangy = b()
        }
    }
})(function () {
    var u = "object",
        d = "function",
        A = "undefined";
    var a = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"];
    var q = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"];
    var l = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"];
    var I = ["collapse", "compareEndPoints", "duplicate", "moveToElementText", "parentElement", "select", "setEndPoint", "getBoundingClientRect"];

    function D(Q, P) {
        var O = typeof Q[P];
        return O == d || (!!(O == u && Q[P])) || O == "unknown"
    }

    function y(P, O) {
        return !!(typeof P[O] == u && P[O])
    }

    function f(P, O) {
        return typeof P[O] != A
    }

    function w(O) {
        return function (R, Q) {
            var P = Q.length;
            while (P--) {
                if (!O(R, Q[P])) {
                    return false
                }
            }
            return true
        }
    }
    var j = w(D);
    var t = w(y);
    var g = w(f);

    function z(O) {
        return O && j(O, I) && g(O, l)
    }

    function M(O) {
        return y(O, "body") ? O.body : O.getElementsByTagName("body")[0]
    }
    var b = [].forEach ? function (O, P) {
        O.forEach(P)
    } : function (P, R) {
        for (var Q = 0, O = P.length; Q < O; ++Q) {
            R(P[Q], Q)
        }
    };
    var v = {};
    var C = (typeof window != A && typeof document != A);
    var k = {
        isHostMethod: D,
        isHostObject: y,
        isHostProperty: f,
        areHostMethods: j,
        areHostObjects: t,
        areHostProperties: g,
        isTextRange: z,
        getBody: M,
        forEach: b
    };
    var h = {
        version: "1.3.0",
        initialized: false,
        isBrowser: C,
        supported: true,
        util: k,
        features: {},
        modules: v,
        config: {
            alertOnFail: false,
            alertOnWarn: false,
            preferTextRange: false,
            autoInitialize: (typeof rangyAutoInitialize == A) ? true : rangyAutoInitialize
        }
    };

    function H(O) {
        if (typeof console != A && D(console, "log")) {
            console.log(O)
        }
    }

    function p(P, O) {
        if (C && O) {
            alert(P)
        } else {
            H(P)
        }
    }

    function m(O) {
        h.initialized = true;
        h.supported = false;
        p("Rangy is not supported in this environment. Reason: " + O, h.config.alertOnFail)
    }
    h.fail = m;

    function n(O) {
        p("Rangy warning: " + O, h.config.alertOnWarn)
    }
    h.warn = n;
    var o;
    if ({}.hasOwnProperty) {
        k.extend = o = function (S, Q, O) {
            var T, R;
            for (var P in Q) {
                if (Q.hasOwnProperty(P)) {
                    T = S[P];
                    R = Q[P];
                    if (O && T !== null && typeof T == "object" && R !== null && typeof R == "object") {
                        o(T, R, true)
                    }
                    S[P] = R
                }
            }
            if (Q.hasOwnProperty("toString")) {
                S.toString = Q.toString
            }
            return S
        };
        k.createOptions = function (O, Q) {
            var P = {};
            o(P, Q);
            if (O) {
                o(P, O)
            }
            return P
        }
    } else {
        m("hasOwnProperty not supported")
    }
    if (!C) {
        m("Rangy can only run in a browser")
    }(function () {
        var O;
        if (C) {
            var P = document.createElement("div");
            P.appendChild(document.createElement("span"));
            var R = [].slice;
            try {
                if (R.call(P.childNodes, 0)[0].nodeType == 1) {
                    O = function (S) {
                        return R.call(S, 0)
                    }
                }
            } catch (Q) {}
        }
        if (!O) {
            O = function (U) {
                var T = [];
                for (var V = 0, S = U.length; V < S; ++V) {
                    T[V] = U[V]
                }
                return T
            }
        }
        k.toArray = O
    })();
    var i;
    if (C) {
        if (D(document, "addEventListener")) {
            i = function (Q, O, P) {
                Q.addEventListener(O, P, false)
            }
        } else {
            if (D(document, "attachEvent")) {
                i = function (Q, O, P) {
                    Q.attachEvent("on" + O, P)
                }
            } else {
                m("Document does not have required addEventListener or attachEvent method")
            }
        }
        k.addListener = i
    }
    var N = [];

    function c(O) {
        return O.message || O.description || String(O)
    }

    function K() {
        if (!C || h.initialized) {
            return
        }
        var Q;
        var X = false,
            R = false;
        if (D(document, "createRange")) {
            Q = document.createRange();
            if (j(Q, q) && g(Q, a)) {
                X = true
            }
        }
        var T = M(document);
        if (!T || T.nodeName.toLowerCase() != "body") {
            m("No body element found");
            return
        }
        if (T && D(T, "createTextRange")) {
            Q = T.createTextRange();
            if (z(Q)) {
                R = true
            }
        }
        if (!X && !R) {
            m("Neither Range nor TextRange are available");
            return
        }
        h.initialized = true;
        h.features = {
            implementsDomRange: X,
            implementsTextRange: R
        };
        var P, V;
        for (var O in v) {
            if ((P = v[O]) instanceof x) {
                P.init(P, h)
            }
        }
        for (var S = 0, U = N.length; S < U; ++S) {
            try {
                N[S](h)
            } catch (W) {
                V = "Rangy init listener threw an exception. Continuing. Detail: " + c(W);
                H(V)
            }
        }
    }

    function F(O, Q, P) {
        if (P) {
            O += " in module " + P.name
        }
        h.warn("DEPRECATED: " + O + " is deprecated. Please use " + Q + " instead.")
    }

    function J(O, P, R, Q) {
        O[P] = function () {
            F(P, R, Q);
            return O[R].apply(O, k.toArray(arguments))
        }
    }
    k.deprecationNotice = F;
    k.createAliasForDeprecatedMethod = J;
    h.init = K;
    h.addInitListener = function (O) {
        if (h.initialized) {
            O(h)
        } else {
            N.push(O)
        }
    };
    var s = [];
    h.addShimListener = function (O) {
        s.push(O)
    };

    function E(Q) {
        Q = Q || window;
        K();
        for (var P = 0, O = s.length; P < O; ++P) {
            s[P](Q)
        }
    }
    if (C) {
        h.shim = h.createMissingNativeApi = E;
        J(h, "createMissingNativeApi", "shim")
    }

    function x(O, Q, P) {
        this.name = O;
        this.dependencies = Q;
        this.initialized = false;
        this.supported = false;
        this.initializer = P
    }
    x.prototype = {
        init: function () {
            var R = this.dependencies || [];
            for (var Q = 0, O = R.length, S, P; Q < O; ++Q) {
                P = R[Q];
                S = v[P];
                if (!S || !(S instanceof x)) {
                    throw new Error("required module '" + P + "' not found")
                }
                S.init();
                if (!S.supported) {
                    throw new Error("required module '" + P + "' not supported")
                }
            }
            this.initializer(this)
        },
        fail: function (O) {
            this.initialized = true;
            this.supported = false;
            throw new Error(O)
        },
        warn: function (O) {
            h.warn("Module " + this.name + ": " + O)
        },
        deprecationNotice: function (O, P) {
            h.warn("DEPRECATED: " + O + " in module " + this.name + " is deprecated. Please use " + P + " instead")
        },
        createError: function (O) {
            return new Error("Error in Rangy " + this.name + " module: " + O)
        }
    };

    function r(O, Q, R) {
        var P = new x(O, Q, function (U) {
            if (!U.initialized) {
                U.initialized = true;
                try {
                    R(h, U);
                    U.supported = true
                } catch (T) {
                    var S = "Module '" + O + "' failed to load: " + c(T);
                    H(S);
                    if (T.stack) {
                        H(T.stack)
                    }
                }
            }
        });
        v[O] = P;
        return P
    }
    h.createModule = function (O) {
        var R, Q;
        if (arguments.length == 2) {
            R = arguments[1];
            Q = []
        } else {
            R = arguments[2];
            Q = arguments[1]
        }
        var P = r(O, Q, R);
        if (h.initialized && h.supported) {
            P.init()
        }
    };
    h.createCoreModule = function (O, P, Q) {
        r(O, P, Q)
    };

    function G() {}
    h.RangePrototype = G;
    h.rangePrototype = new G();

    function B() {}
    h.selectionPrototype = new B();
    h.createCoreModule("DomUtil", [], function (R, P) {
        var ah = "undefined";
        var T = R.util;
        var ax = T.getBody;
        if (!T.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"])) {
            P.fail("document missing a Node creation method")
        }
        if (!T.isHostMethod(document, "getElementsByTagName")) {
            P.fail("document missing getElementsByTagName method")
        }
        var av = document.createElement("div");
        if (!T.areHostMethods(av, ["insertBefore", "appendChild", "cloneNode"] || !T.areHostObjects(av, ["previousSibling", "nextSibling", "childNodes", "parentNode"]))) {
            P.fail("Incomplete Element implementation")
        }
        if (!T.isHostProperty(av, "innerHTML")) {
            P.fail("Element is missing innerHTML property")
        }
        var ay = document.createTextNode("test");
        if (!T.areHostMethods(ay, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] || !T.areHostObjects(av, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) || !T.areHostProperties(ay, ["data"]))) {
            P.fail("Incomplete Text Node implementation")
        }
        var aB = function (aC, aE) {
            var aD = aC.length;
            while (aD--) {
                if (aC[aD] === aE) {
                    return true
                }
            }
            return false
        };

        function V(aD) {
            var aC;
            return typeof aD.namespaceURI == ah || ((aC = aD.namespaceURI) === null || aC == "http://www.w3.org/1999/xhtml")
        }

        function ai(aD) {
            var aC = aD.parentNode;
            return (aC.nodeType == 1) ? aC : null
        }

        function ac(aD) {
            var aC = 0;
            while ((aD = aD.previousSibling)) {
                ++aC
            }
            return aC
        }

        function ak(aC) {
            switch (aC.nodeType) {
                case 7:
                case 10:
                    return 0;
                case 3:
                case 8:
                    return aC.length;
                default:
                    return aC.childNodes.length
            }
        }

        function Z(aD, aC) {
            var aE = [],
                aF;
            for (aF = aD; aF; aF = aF.parentNode) {
                aE.push(aF)
            }
            for (aF = aC; aF; aF = aF.parentNode) {
                if (aB(aE, aF)) {
                    return aF
                }
            }
            return null
        }

        function Y(aC, aD, aF) {
            var aE = aF ? aD : aD.parentNode;
            while (aE) {
                if (aE === aC) {
                    return true
                } else {
                    aE = aE.parentNode
                }
            }
            return false
        }

        function at(aC, aD) {
            return Y(aC, aD, true)
        }

        function ap(aD, aC, aG) {
            var aE, aF = aG ? aD : aD.parentNode;
            while (aF) {
                aE = aF.parentNode;
                if (aE === aC) {
                    return aF
                }
                aF = aE
            }
            return null
        }

        function Q(aD) {
            var aC = aD.nodeType;
            return aC == 3 || aC == 4 || aC == 8
        }

        function O(aD) {
            if (!aD) {
                return false
            }
            var aC = aD.nodeType;
            return aC == 3 || aC == 8
        }

        function U(aF, aD) {
            var aC = aD.nextSibling,
                aE = aD.parentNode;
            if (aC) {
                aE.insertBefore(aF, aC)
            } else {
                aE.appendChild(aF)
            }
            return aF
        }

        function aj(aH, aE, aD) {
            var aG = aH.cloneNode(false);
            aG.deleteData(0, aE);
            aH.deleteData(aE, aH.length - aE);
            U(aG, aH);
            if (aD) {
                for (var aF = 0, aC; aC = aD[aF++];) {
                    if (aC.node == aH && aC.offset > aE) {
                        aC.node = aG;
                        aC.offset -= aE
                    } else {
                        if (aC.node == aH.parentNode && aC.offset > ac(aH)) {
                            ++aC.offset
                        }
                    }
                }
            }
            return aG
        }

        function az(aC) {
            if (aC.nodeType == 9) {
                return aC
            } else {
                if (typeof aC.ownerDocument != ah) {
                    return aC.ownerDocument
                } else {
                    if (typeof aC.document != ah) {
                        return aC.document
                    } else {
                        if (aC.parentNode) {
                            return az(aC.parentNode)
                        } else {
                            throw P.createError("getDocument: no document found for node")
                        }
                    }
                }
            }
        }

        function ab(aC) {
            var aD = az(aC);
            if (typeof aD.defaultView != ah) {
                return aD.defaultView
            } else {
                if (typeof aD.parentWindow != ah) {
                    return aD.parentWindow
                } else {
                    throw P.createError("Cannot get a window object for node")
                }
            }
        }

        function aA(aC) {
            if (typeof aC.contentDocument != ah) {
                return aC.contentDocument
            } else {
                if (typeof aC.contentWindow != ah) {
                    return aC.contentWindow.document
                } else {
                    throw P.createError("getIframeDocument: No Document object found for iframe element")
                }
            }
        }

        function aw(aC) {
            if (typeof aC.contentWindow != ah) {
                return aC.contentWindow
            } else {
                if (typeof aC.contentDocument != ah) {
                    return aC.contentDocument.defaultView
                } else {
                    throw P.createError("getIframeWindow: No Window object found for iframe element")
                }
            }
        }

        function an(aC) {
            return aC && T.isHostMethod(aC, "setTimeout") && T.isHostObject(aC, "document")
        }

        function am(aF, aD, aC) {
            var aE;
            if (!aF) {
                aE = document
            } else {
                if (T.isHostProperty(aF, "nodeType")) {
                    aE = (aF.nodeType == 1 && aF.tagName.toLowerCase() == "iframe") ? aA(aF) : az(aF)
                } else {
                    if (an(aF)) {
                        aE = aF.document
                    }
                }
            }
            if (!aE) {
                throw aD.createError(aC + "(): Parameter must be a Window object or DOM node")
            }
            return aE
        }

        function W(aD) {
            var aC;
            while ((aC = aD.parentNode)) {
                aD = aC
            }
            return aD
        }

        function aq(aF, aH, aE, aG) {
            var aC, aI, aK, aJ, aD;
            if (aF == aE) {
                return aH === aG ? 0 : (aH < aG) ? -1 : 1
            } else {
                if ((aC = ap(aE, aF, true))) {
                    return aH <= ac(aC) ? -1 : 1
                } else {
                    if ((aC = ap(aF, aE, true))) {
                        return ac(aC) < aG ? -1 : 1
                    } else {
                        aI = Z(aF, aE);
                        if (!aI) {
                            throw new Error("comparePoints error: nodes have no common ancestor")
                        }
                        aK = (aF === aI) ? aI : ap(aF, aI, true);
                        aJ = (aE === aI) ? aI : ap(aE, aI, true);
                        if (aK === aJ) {
                            throw P.createError("comparePoints got to case 4 and childA and childB are the same!")
                        } else {
                            aD = aI.firstChild;
                            while (aD) {
                                if (aD === aK) {
                                    return -1
                                } else {
                                    if (aD === aJ) {
                                        return 1
                                    }
                                }
                                aD = aD.nextSibling
                            }
                        }
                    }
                }
            }
        }
        var af = false;

        function ae(aC) {
            var aE;
            try {
                aE = aC.parentNode;
                return false
            } catch (aD) {
                return true
            }
        }(function () {
            var aC = document.createElement("b");
            aC.innerHTML = "1";
            var aD = aC.firstChild;
            aC.innerHTML = "<br />";
            af = ae(aD);
            R.features.crashyTextNodes = af
        })();

        function ag(aC) {
            if (!aC) {
                return "[No node]"
            }
            if (af && ae(aC)) {
                return "[Broken node]"
            }
            if (Q(aC)) {
                return '"' + aC.data + '"'
            }
            if (aC.nodeType == 1) {
                var aD = aC.id ? ' id="' + aC.id + '"' : "";
                return "<" + aC.nodeName + aD + ">[index:" + ac(aC) + ",length:" + aC.childNodes.length + "][" + (aC.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]"
            }
            return aC.nodeName
        }

        function ao(aD) {
            var aC = az(aD).createDocumentFragment(),
                aE;
            while ((aE = aD.firstChild)) {
                aC.appendChild(aE)
            }
            return aC
        }
        var aa;
        if (typeof window.getComputedStyle != ah) {
            aa = function (aC, aD) {
                return ab(aC).getComputedStyle(aC, null)[aD]
            }
        } else {
            if (typeof document.documentElement.currentStyle != ah) {
                aa = function (aC, aD) {
                    return aC.currentStyle ? aC.currentStyle[aD] : ""
                }
            } else {
                P.fail("No means of obtaining computed style properties found")
            }
        }

        function ar(aH, aE, aG) {
            var aC = ax(aH);
            var aF = aH.createElement("div");
            aF.contentEditable = "" + !!aG;
            if (aE) {
                aF.innerHTML = aE
            }
            var aD = aC.firstChild;
            if (aD) {
                aC.insertBefore(aF, aD)
            } else {
                aC.appendChild(aF)
            }
            return aF
        }

        function X(aC) {
            return aC.parentNode.removeChild(aC)
        }

        function S(aC) {
            this.root = aC;
            this._next = aC
        }
        S.prototype = {
            _current: null,
            hasNext: function () {
                return !!this._next
            },
            next: function () {
                var aE = this._current = this._next;
                var aD, aC;
                if (this._current) {
                    aD = aE.firstChild;
                    if (aD) {
                        this._next = aD
                    } else {
                        aC = null;
                        while ((aE !== this.root) && !(aC = aE.nextSibling)) {
                            aE = aE.parentNode
                        }
                        this._next = aC
                    }
                }
                return this._current
            },
            detach: function () {
                this._current = this._next = this.root = null
            }
        };

        function au(aC) {
            return new S(aC)
        }

        function ad(aC, aD) {
            this.node = aC;
            this.offset = aD
        }
        ad.prototype = {
            equals: function (aC) {
                return !!aC && this.node === aC.node && this.offset == aC.offset
            },
            inspect: function () {
                return "[DomPosition(" + ag(this.node) + ":" + this.offset + ")]"
            },
            toString: function () {
                return this.inspect()
            }
        };

        function al(aC) {
            this.code = this[aC];
            this.codeName = aC;
            this.message = "DOMException: " + this.codeName
        }
        al.prototype = {
            INDEX_SIZE_ERR: 1,
            HIERARCHY_REQUEST_ERR: 3,
            WRONG_DOCUMENT_ERR: 4,
            NO_MODIFICATION_ALLOWED_ERR: 7,
            NOT_FOUND_ERR: 8,
            NOT_SUPPORTED_ERR: 9,
            INVALID_STATE_ERR: 11,
            INVALID_NODE_TYPE_ERR: 24
        };
        al.prototype.toString = function () {
            return this.message
        };
        R.dom = {
            arrayContains: aB,
            isHtmlNamespace: V,
            parentElement: ai,
            getNodeIndex: ac,
            getNodeLength: ak,
            getCommonAncestor: Z,
            isAncestorOf: Y,
            isOrIsAncestorOf: at,
            getClosestAncestorIn: ap,
            isCharacterDataNode: Q,
            isTextOrCommentNode: O,
            insertAfter: U,
            splitDataNode: aj,
            getDocument: az,
            getWindow: ab,
            getIframeWindow: aw,
            getIframeDocument: aA,
            getBody: ax,
            isWindow: an,
            getContentDocument: am,
            getRootContainer: W,
            comparePoints: aq,
            isBrokenNode: ae,
            inspectNode: ag,
            getComputedStyleProperty: aa,
            createTestElement: ar,
            removeNode: X,
            fragmentFromNodeChildren: ao,
            createIterator: au,
            DomPosition: ad
        };
        R.DOMException = al
    });
    h.createCoreModule("DomRange", ["DomUtil"], function (ad, a7) {
        var ag = ad.dom;
        var aV = ad.util;
        var av = ag.DomPosition;
        var aM = ad.DOMException;
        var az = ag.isCharacterDataNode;
        var R = ag.getNodeIndex;
        var ay = ag.isOrIsAncestorOf;
        var a8 = ag.getDocument;
        var aX = ag.comparePoints;
        var a3 = ag.splitDataNode;
        var aP = ag.getClosestAncestorIn;
        var aC = ag.getNodeLength;
        var a5 = ag.arrayContains;
        var ah = ag.getRootContainer;
        var ak = ad.features.crashyTextNodes;
        var a0 = ag.removeNode;

        function aR(ba, a9) {
            return (ba.nodeType != 3) && (ay(ba, a9.startContainer) || ay(ba, a9.endContainer))
        }

        function aY(a9) {
            return a9.document || a8(a9.startContainer)
        }

        function O(a9) {
            return ah(a9.startContainer)
        }

        function al(a9) {
            return new av(a9.parentNode, R(a9))
        }

        function W(a9) {
            return new av(a9.parentNode, R(a9) + 1)
        }

        function S(ba, bc, bb) {
            var a9 = ba.nodeType == 11 ? ba.firstChild : ba;
            if (az(bc)) {
                if (bb == bc.length) {
                    ag.insertAfter(ba, bc)
                } else {
                    bc.parentNode.insertBefore(ba, bb == 0 ? bc : a3(bc, bb))
                }
            } else {
                if (bb >= bc.childNodes.length) {
                    bc.appendChild(ba)
                } else {
                    bc.insertBefore(ba, bc.childNodes[bb])
                }
            }
            return a9
        }

        function X(bc, bb, a9) {
            P(bc);
            P(bb);
            if (aY(bb) != aY(bc)) {
                throw new aM("WRONG_DOCUMENT_ERR")
            }
            var bd = aX(bc.startContainer, bc.startOffset, bb.endContainer, bb.endOffset),
                ba = aX(bc.endContainer, bc.endOffset, bb.startContainer, bb.startOffset);
            return a9 ? bd <= 0 && ba >= 0 : bd < 0 && ba > 0
        }

        function ae(bb) {
            var ba;
            for (var bc, bd = aY(bb.range).createDocumentFragment(), a9; bc = bb.next();) {
                ba = bb.isPartiallySelectedSubtree();
                bc = bc.cloneNode(!ba);
                if (ba) {
                    a9 = bb.getSubtreeIterator();
                    bc.appendChild(ae(a9));
                    a9.detach()
                }
                if (bc.nodeType == 10) {
                    throw new aM("HIERARCHY_REQUEST_ERR")
                }
                bd.appendChild(bc)
            }
            return bd
        }

        function aZ(ba, bd, a9) {
            var bb, bf;
            a9 = a9 || {
                stop: false
            };
            for (var bc, be; bc = ba.next();) {
                if (ba.isPartiallySelectedSubtree()) {
                    if (bd(bc) === false) {
                        a9.stop = true;
                        return
                    } else {
                        be = ba.getSubtreeIterator();
                        aZ(be, bd, a9);
                        be.detach();
                        if (a9.stop) {
                            return
                        }
                    }
                } else {
                    bb = ag.createIterator(bc);
                    while ((bf = bb.next())) {
                        if (bd(bf) === false) {
                            a9.stop = true;
                            return
                        }
                    }
                }
            }
        }

        function aA(ba) {
            var a9;
            while (ba.next()) {
                if (ba.isPartiallySelectedSubtree()) {
                    a9 = ba.getSubtreeIterator();
                    aA(a9);
                    a9.detach()
                } else {
                    ba.remove()
                }
            }
        }

        function aU(ba) {
            for (var bb, bc = aY(ba.range).createDocumentFragment(), a9; bb = ba.next();) {
                if (ba.isPartiallySelectedSubtree()) {
                    bb = bb.cloneNode(false);
                    a9 = ba.getSubtreeIterator();
                    bb.appendChild(aU(a9));
                    a9.detach()
                } else {
                    ba.remove()
                }
                if (bb.nodeType == 10) {
                    throw new aM("HIERARCHY_REQUEST_ERR")
                }
                bc.appendChild(bb)
            }
            return bc
        }

        function aD(bb, a9, bc) {
            var be = !!(a9 && a9.length),
                bd;
            var bf = !!bc;
            if (be) {
                bd = new RegExp("^(" + a9.join("|") + ")$")
            }
            var ba = [];
            aZ(new aj(bb, false), function (bh) {
                if (be && !bd.test(bh.nodeType)) {
                    return
                }
                if (bf && !bc(bh)) {
                    return
                }
                var bi = bb.startContainer;
                if (bh == bi && az(bi) && bb.startOffset == bi.length) {
                    return
                }
                var bg = bb.endContainer;
                if (bh == bg && az(bg) && bb.endOffset == 0) {
                    return
                }
                ba.push(bh)
            });
            return ba
        }

        function a2(a9) {
            var ba = (typeof a9.getName == "undefined") ? "Range" : a9.getName();
            return "[" + ba + "(" + ag.inspectNode(a9.startContainer) + ":" + a9.startOffset + ", " + ag.inspectNode(a9.endContainer) + ":" + a9.endOffset + ")]"
        }

        function aj(bb, ba) {
            this.range = bb;
            this.clonePartiallySelectedTextNodes = ba;
            if (!bb.collapsed) {
                this.sc = bb.startContainer;
                this.so = bb.startOffset;
                this.ec = bb.endContainer;
                this.eo = bb.endOffset;
                var a9 = bb.commonAncestorContainer;
                if (this.sc === this.ec && az(this.sc)) {
                    this.isSingleCharacterDataNode = true;
                    this._first = this._last = this._next = this.sc
                } else {
                    this._first = this._next = (this.sc === a9 && !az(this.sc)) ? this.sc.childNodes[this.so] : aP(this.sc, a9, true);
                    this._last = (this.ec === a9 && !az(this.ec)) ? this.ec.childNodes[this.eo - 1] : aP(this.ec, a9, true)
                }
            }
        }
        aj.prototype = {
            _current: null,
            _next: null,
            _first: null,
            _last: null,
            isSingleCharacterDataNode: false,
            reset: function () {
                this._current = null;
                this._next = this._first
            },
            hasNext: function () {
                return !!this._next
            },
            next: function () {
                var a9 = this._current = this._next;
                if (a9) {
                    this._next = (a9 !== this._last) ? a9.nextSibling : null;
                    if (az(a9) && this.clonePartiallySelectedTextNodes) {
                        if (a9 === this.ec) {
                            (a9 = a9.cloneNode(true)).deleteData(this.eo, a9.length - this.eo)
                        }
                        if (this._current === this.sc) {
                            (a9 = a9.cloneNode(true)).deleteData(0, this.so)
                        }
                    }
                }
                return a9
            },
            remove: function () {
                var ba = this._current,
                    bb, a9;
                if (az(ba) && (ba === this.sc || ba === this.ec)) {
                    bb = (ba === this.sc) ? this.so : 0;
                    a9 = (ba === this.ec) ? this.eo : ba.length;
                    if (bb != a9) {
                        ba.deleteData(bb, a9 - bb)
                    }
                } else {
                    if (ba.parentNode) {
                        a0(ba)
                    } else {}
                }
            },
            isPartiallySelectedSubtree: function () {
                var a9 = this._current;
                return aR(a9, this.range)
            },
            getSubtreeIterator: function () {
                var ba;
                if (this.isSingleCharacterDataNode) {
                    ba = this.range.cloneRange();
                    ba.collapse(false)
                } else {
                    ba = new ap(aY(this.range));
                    var be = this._current;
                    var bc = be,
                        a9 = 0,
                        bd = be,
                        bb = aC(be);
                    if (ay(be, this.sc)) {
                        bc = this.sc;
                        a9 = this.so
                    }
                    if (ay(be, this.ec)) {
                        bd = this.ec;
                        bb = this.eo
                    }
                    aQ(ba, bc, a9, bd, bb)
                }
                return new aj(ba, this.clonePartiallySelectedTextNodes)
            },
            detach: function () {
                this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null
            }
        };
        var aF = [1, 3, 4, 5, 7, 8, 10];
        var aW = [2, 9, 11];
        var Y = [5, 6, 10, 12];
        var an = [1, 3, 4, 5, 7, 8, 10, 11];
        var a6 = [1, 3, 4, 5, 7, 8];

        function ab(a9) {
            return function (bb, bd) {
                var ba, bc = bd ? bb : bb.parentNode;
                while (bc) {
                    ba = bc.nodeType;
                    if (a5(a9, ba)) {
                        return bc
                    }
                    bc = bc.parentNode
                }
                return null
            }
        }
        var a4 = ab([9, 11]);
        var au = ab(Y);
        var am = ab([6, 10, 12]);

        function ac(ba, a9) {
            if (am(ba, a9)) {
                throw new aM("INVALID_NODE_TYPE_ERR")
            }
        }

        function Q(a9, ba) {
            if (!a5(ba, a9.nodeType)) {
                throw new aM("INVALID_NODE_TYPE_ERR")
            }
        }

        function aG(a9, ba) {
            if (ba < 0 || ba > (az(a9) ? a9.length : a9.childNodes.length)) {
                throw new aM("INDEX_SIZE_ERR")
            }
        }

        function aO(ba, a9) {
            if (a4(ba, true) !== a4(a9, true)) {
                throw new aM("WRONG_DOCUMENT_ERR")
            }
        }

        function aB(a9) {
            if (au(a9, true)) {
                throw new aM("NO_MODIFICATION_ALLOWED_ERR")
            }
        }

        function aI(ba, a9) {
            if (!ba) {
                throw new aM(a9)
            }
        }

        function V(a9, ba) {
            return ba <= (az(a9) ? a9.length : a9.childNodes.length)
        }

        function aq(a9) {
            return (!!a9.startContainer && !!a9.endContainer && !(ak && (ag.isBrokenNode(a9.startContainer) || ag.isBrokenNode(a9.endContainer))) && ah(a9.startContainer) == ah(a9.endContainer) && V(a9.startContainer, a9.startOffset) && V(a9.endContainer, a9.endOffset))
        }

        function P(a9) {
            if (!aq(a9)) {
                throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: (" + a9.inspect() + ")")
            }
        }
        var aH = document.createElement("style");
        var ax = false;
        try {
            aH.innerHTML = "<b>x</b>";
            ax = (aH.firstChild.nodeType == 3)
        } catch (aw) {}
        ad.features.htmlParsingConforms = ax;
        var ai = ax ? function (bb) {
            var ba = this.startContainer;
            var bc = a8(ba);
            if (!ba) {
                throw new aM("INVALID_STATE_ERR")
            }
            var a9 = null;
            if (ba.nodeType == 1) {
                a9 = ba
            } else {
                if (az(ba)) {
                    a9 = ag.parentElement(ba)
                }
            }
            if (a9 === null || (a9.nodeName == "HTML" && ag.isHtmlNamespace(a8(a9).documentElement) && ag.isHtmlNamespace(a9))) {
                a9 = bc.createElement("body")
            } else {
                a9 = a9.cloneNode(false)
            }
            a9.innerHTML = bb;
            return ag.fragmentFromNodeChildren(a9)
        } : function (ba) {
            var bb = aY(this);
            var a9 = bb.createElement("body");
            a9.innerHTML = ba;
            return ag.fragmentFromNodeChildren(a9)
        };

        function ao(bb, a9) {
            P(bb);
            var bf = bb.startContainer,
                be = bb.startOffset,
                bc = bb.endContainer,
                ba = bb.endOffset;
            var bd = (bf === bc);
            if (az(bc) && ba > 0 && ba < bc.length) {
                a3(bc, ba, a9)
            }
            if (az(bf) && be > 0 && be < bf.length) {
                bf = a3(bf, be, a9);
                if (bd) {
                    ba -= be;
                    bc = bf
                } else {
                    if (bc == bf.parentNode && ba >= R(bf)) {
                        ba++
                    }
                }
                be = 0
            }
            bb.setStartAndEnd(bf, be, bc, ba)
        }

        function T(ba) {
            P(ba);
            var a9 = ba.commonAncestorContainer.parentNode.cloneNode(false);
            a9.appendChild(ba.cloneContents());
            return a9.innerHTML
        }
        var aJ = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"];
        var aN = 0,
            aS = 1,
            aa = 2,
            U = 3;
        var aK = 0,
            aL = 1,
            aT = 2,
            aE = 3;
        aV.extend(ad.rangePrototype, {
            compareBoundaryPoints: function (be, bb) {
                P(this);
                aO(this.startContainer, bb.startContainer);
                var bg, ba, bf, a9;
                var bd = (be == U || be == aN) ? "start" : "end";
                var bc = (be == aS || be == aN) ? "start" : "end";
                bg = this[bd + "Container"];
                ba = this[bd + "Offset"];
                bf = bb[bc + "Container"];
                a9 = bb[bc + "Offset"];
                return aX(bg, ba, bf, a9)
            },
            insertNode: function (ba) {
                P(this);
                Q(ba, an);
                aB(this.startContainer);
                if (ay(ba, this.startContainer)) {
                    throw new aM("HIERARCHY_REQUEST_ERR")
                }
                var a9 = S(ba, this.startContainer, this.startOffset);
                this.setStartBefore(a9)
            },
            cloneContents: function () {
                P(this);
                var bb, ba;
                if (this.collapsed) {
                    return aY(this).createDocumentFragment()
                } else {
                    if (this.startContainer === this.endContainer && az(this.startContainer)) {
                        bb = this.startContainer.cloneNode(true);
                        bb.data = bb.data.slice(this.startOffset, this.endOffset);
                        ba = aY(this).createDocumentFragment();
                        ba.appendChild(bb);
                        return ba
                    } else {
                        var a9 = new aj(this, true);
                        bb = ae(a9);
                        a9.detach()
                    }
                    return bb
                }
            },
            canSurroundContents: function () {
                P(this);
                aB(this.startContainer);
                aB(this.endContainer);
                var a9 = new aj(this, true);
                var ba = (a9._first && (aR(a9._first, this)) || (a9._last && aR(a9._last, this)));
                a9.detach();
                return !ba
            },
            surroundContents: function (ba) {
                Q(ba, a6);
                if (!this.canSurroundContents()) {
                    throw new aM("INVALID_STATE_ERR")
                }
                var a9 = this.extractContents();
                if (ba.hasChildNodes()) {
                    while (ba.lastChild) {
                        ba.removeChild(ba.lastChild)
                    }
                }
                S(ba, this.startContainer, this.startOffset);
                ba.appendChild(a9);
                this.selectNode(ba)
            },
            cloneRange: function () {
                P(this);
                var a9 = new ap(aY(this));
                var ba = aJ.length,
                    bb;
                while (ba--) {
                    bb = aJ[ba];
                    a9[bb] = this[bb]
                }
                return a9
            },
            toString: function () {
                P(this);
                var bb = this.startContainer;
                if (bb === this.endContainer && az(bb)) {
                    return (bb.nodeType == 3 || bb.nodeType == 4) ? bb.data.slice(this.startOffset, this.endOffset) : ""
                } else {
                    var a9 = [],
                        ba = new aj(this, true);
                    aZ(ba, function (bc) {
                        if (bc.nodeType == 3 || bc.nodeType == 4) {
                            a9.push(bc.data)
                        }
                    });
                    ba.detach();
                    return a9.join("")
                }
            },
            compareNode: function (bb) {
                P(this);
                var ba = bb.parentNode;
                var bd = R(bb);
                if (!ba) {
                    throw new aM("NOT_FOUND_ERR")
                }
                var bc = this.comparePoint(ba, bd),
                    a9 = this.comparePoint(ba, bd + 1);
                if (bc < 0) {
                    return (a9 > 0) ? aT : aK
                } else {
                    return (a9 > 0) ? aL : aE
                }
            },
            comparePoint: function (a9, ba) {
                P(this);
                aI(a9, "HIERARCHY_REQUEST_ERR");
                aO(a9, this.startContainer);
                if (aX(a9, ba, this.startContainer, this.startOffset) < 0) {
                    return -1
                } else {
                    if (aX(a9, ba, this.endContainer, this.endOffset) > 0) {
                        return 1
                    }
                }
                return 0
            },
            createContextualFragment: ai,
            toHtml: function () {
                console.log("LITE-min: toHtml() with this:" + this)
                return T(this)
            },
            intersectsNode: function (bc, a9) {
                P(this);
                if (ah(bc) != O(this)) {
                    return false
                }
                var bb = bc.parentNode,
                    be = R(bc);
                if (!bb) {
                    return true
                }
                var bd = aX(bb, be, this.endContainer, this.endOffset),
                    ba = aX(bb, be + 1, this.startContainer, this.startOffset);
                return a9 ? bd <= 0 && ba >= 0 : bd < 0 && ba > 0
            },
            isPointInRange: function (a9, ba) {
                P(this);
                aI(a9, "HIERARCHY_REQUEST_ERR");
                aO(a9, this.startContainer);
                return (aX(a9, ba, this.startContainer, this.startOffset) >= 0) && (aX(a9, ba, this.endContainer, this.endOffset) <= 0)
            },
            intersectsRange: function (a9) {
                return X(this, a9, false)
            },
            intersectsOrTouchesRange: function (a9) {
                return X(this, a9, true)
            },
            intersection: function (a9) {
                if (this.intersectsRange(a9)) {
                    var bc = aX(this.startContainer, this.startOffset, a9.startContainer, a9.startOffset),
                        ba = aX(this.endContainer, this.endOffset, a9.endContainer, a9.endOffset);
                    var bb = this.cloneRange();
                    if (bc == -1) {
                        bb.setStart(a9.startContainer, a9.startOffset)
                    }
                    if (ba == 1) {
                        bb.setEnd(a9.endContainer, a9.endOffset)
                    }
                    return bb
                }
                return null
            },
            union: function (a9) {
                if (this.intersectsOrTouchesRange(a9)) {
                    var ba = this.cloneRange();
                    if (aX(a9.startContainer, a9.startOffset, this.startContainer, this.startOffset) == -1) {
                        ba.setStart(a9.startContainer, a9.startOffset)
                    }
                    if (aX(a9.endContainer, a9.endOffset, this.endContainer, this.endOffset) == 1) {
                        ba.setEnd(a9.endContainer, a9.endOffset)
                    }
                    return ba
                } else {
                    throw new aM("Ranges do not intersect")
                }
            },
            containsNode: function (ba, a9) {
                if (a9) {
                    return this.intersectsNode(ba, false)
                } else {
                    return this.compareNode(ba) == aE
                }
            },
            containsNodeContents: function (a9) {
                return this.comparePoint(a9, 0) >= 0 && this.comparePoint(a9, aC(a9)) <= 0
            },
            containsRange: function (a9) {
                var ba = this.intersection(a9);
                return ba !== null && a9.equals(ba)
            },
            containsNodeText: function (bb) {
                var bc = this.cloneRange();
                bc.selectNode(bb);
                var ba = bc.getNodes([3]);
                if (ba.length > 0) {
                    bc.setStart(ba[0], 0);
                    var a9 = ba.pop();
                    bc.setEnd(a9, a9.length);
                    return this.containsRange(bc)
                } else {
                    return this.containsNodeContents(bb)
                }
            },
            getNodes: function (a9, ba) {
                P(this);
                return aD(this, a9, ba)
            },
            getDocument: function () {
                return aY(this)
            },
            collapseBefore: function (a9) {
                this.setEndBefore(a9);
                this.collapse(false)
            },
            collapseAfter: function (a9) {
                this.setStartAfter(a9);
                this.collapse(true)
            },
            getBookmark: function (a9) {
                var bd = aY(this);
                var bb = ad.createRange(bd);
                a9 = a9 || ag.getBody(bd);
                bb.selectNodeContents(a9);
                var bc = this.intersection(bb);
                var be = 0,
                    ba = 0;
                if (bc) {
                    bb.setEnd(bc.startContainer, bc.startOffset);
                    be = bb.toString().length;
                    ba = be + bc.toString().length
                }
                return {
                    start: be,
                    end: ba,
                    containerNode: a9
                }
            },
            moveToBookmark: function (bg) {
                var bc = bg.containerNode;
                var a9 = 0;
                this.setStart(bc, 0);
                this.collapse(true);
                var be = [bc],
                    ba, bb = false,
                    bh = false;
                var bf, bd, bi;
                while (!bh && (ba = be.pop())) {
                    if (ba.nodeType == 3) {
                        bf = a9 + ba.length;
                        if (!bb && bg.start >= a9 && bg.start <= bf) {
                            this.setStart(ba, bg.start - a9);
                            bb = true
                        }
                        if (bb && bg.end >= a9 && bg.end <= bf) {
                            this.setEnd(ba, bg.end - a9);
                            bh = true
                        }
                        a9 = bf
                    } else {
                        bi = ba.childNodes;
                        bd = bi.length;
                        while (bd--) {
                            be.push(bi[bd])
                        }
                    }
                }
            },
            getName: function () {
                return "DomRange"
            },
            equals: function (a9) {
                return ap.rangesEqual(this, a9)
            },
            isValid: function () {
                return aq(this)
            },
            inspect: function () {
                return a2(this)
            },
            detach: function () {}
        });

        function ar(a9) {
            a9.START_TO_START = aN;
            a9.START_TO_END = aS;
            a9.END_TO_END = aa;
            a9.END_TO_START = U;
            a9.NODE_BEFORE = aK;
            a9.NODE_AFTER = aL;
            a9.NODE_BEFORE_AND_AFTER = aT;
            a9.NODE_INSIDE = aE
        }

        function af(a9) {
            ar(a9);
            ar(a9.prototype)
        }

        function a1(a9, ba) {
            return function () {
                P(this);
                var bg = this.startContainer,
                    bf = this.startOffset,
                    bb = this.commonAncestorContainer;
                var bd = new aj(this, true);
                var be, bh;
                if (bg !== bb) {
                    be = aP(bg, bb, true);
                    bh = W(be);
                    bg = bh.node;
                    bf = bh.offset
                }
                aZ(bd, aB);
                bd.reset();
                var bc = a9(bd);
                bd.detach();
                ba(this, bg, bf, bg, bf);
                return bc
            }
        }

        function Z(ba, be) {
            function bd(bg, bf) {
                return function (bh) {
                    Q(bh, aF);
                    Q(ah(bh), aW);
                    var bi = (bg ? al : W)(bh);
                    (bf ? a9 : bc)(this, bi.node, bi.offset)
                }
            }

            function a9(bg, bi, bj) {
                var bh = bg.endContainer,
                    bf = bg.endOffset;
                if (bi !== bg.startContainer || bj !== bg.startOffset) {
                    if (ah(bi) != ah(bh) || aX(bi, bj, bh, bf) == 1) {
                        bh = bi;
                        bf = bj
                    }
                    be(bg, bi, bj, bh, bf)
                }
            }

            function bc(bf, bg, bj) {
                var bi = bf.startContainer,
                    bh = bf.startOffset;
                if (bg !== bf.endContainer || bj !== bf.endOffset) {
                    if (ah(bg) != ah(bi) || aX(bg, bj, bi, bh) == -1) {
                        bi = bg;
                        bh = bj
                    }
                    be(bf, bi, bh, bg, bj)
                }
            }
            var bb = function () {};
            bb.prototype = ad.rangePrototype;
            ba.prototype = new bb();
            aV.extend(ba.prototype, {
                setStart: function (bf, bg) {
                    ac(bf, true);
                    aG(bf, bg);
                    a9(this, bf, bg)
                },
                setEnd: function (bf, bg) {
                    ac(bf, true);
                    aG(bf, bg);
                    bc(this, bf, bg)
                },
                setStartAndEnd: function () {
                    var bh = arguments;
                    var bj = bh[0],
                        bi = bh[1],
                        bg = bj,
                        bf = bi;
                    switch (bh.length) {
                        case 3:
                            bf = bh[2];
                            break;
                        case 4:
                            bg = bh[2];
                            bf = bh[3];
                            break
                    }
                    be(this, bj, bi, bg, bf)
                },
                setBoundary: function (bg, bh, bf) {
                    this["set" + (bf ? "Start" : "End")](bg, bh)
                },
                setStartBefore: bd(true, true),
                setStartAfter: bd(false, true),
                setEndBefore: bd(true, false),
                setEndAfter: bd(false, false),
                collapse: function (bf) {
                    P(this);
                    if (bf) {
                        be(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset)
                    } else {
                        be(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset)
                    }
                },
                selectNodeContents: function (bf) {
                    ac(bf, true);
                    be(this, bf, 0, bf, aC(bf))
                },
                selectNode: function (bg) {
                    ac(bg, false);
                    Q(bg, aF);
                    var bh = al(bg),
                        bf = W(bg);
                    be(this, bh.node, bh.offset, bf.node, bf.offset)
                },
                extractContents: a1(aU, be),
                deleteContents: a1(aA, be),
                canSurroundContents: function () {
                    P(this);
                    aB(this.startContainer);
                    aB(this.endContainer);
                    var bf = new aj(this, true);
                    var bg = (bf._first && aR(bf._first, this) || (bf._last && aR(bf._last, this)));
                    bf.detach();
                    return !bg
                },
                splitBoundaries: function () {
                    ao(this)
                },
                splitBoundariesPreservingPositions: function (bf) {
                    ao(this, bf)
                },
                normalizeBoundaries: function () {
                    P(this);
                    var bm = this.startContainer,
                        bh = this.startOffset,
                        bl = this.endContainer,
                        bf = this.endOffset;
                    var bj = function (bq) {
                        var bp = bq.nextSibling;
                        if (bp && bp.nodeType == bq.nodeType) {
                            bl = bq;
                            bf = bq.length;
                            bq.appendData(bp.data);
                            a0(bp)
                        }
                    };
                    var bn = function (br) {
                        var bq = br.previousSibling;
                        if (bq && bq.nodeType == br.nodeType) {
                            bm = br;
                            var bp = br.length;
                            bh = bq.length;
                            br.insertData(0, bq.data);
                            a0(bq);
                            if (bm == bl) {
                                bf += bh;
                                bl = bm
                            } else {
                                if (bl == br.parentNode) {
                                    var bs = R(br);
                                    if (bf == bs) {
                                        bl = br;
                                        bf = bp
                                    } else {
                                        if (bf > bs) {
                                            bf--
                                        }
                                    }
                                }
                            }
                        }
                    };
                    var bk = true;
                    var bo;
                    if (az(bl)) {
                        if (bf == bl.length) {
                            bj(bl)
                        } else {
                            if (bf == 0) {
                                bo = bl.previousSibling;
                                if (bo && bo.nodeType == bl.nodeType) {
                                    bf = bo.length;
                                    if (bm == bl) {
                                        bk = false
                                    }
                                    bo.appendData(bl.data);
                                    a0(bl);
                                    bl = bo
                                }
                            }
                        }
                    } else {
                        if (bf > 0) {
                            var bi = bl.childNodes[bf - 1];
                            if (bi && az(bi)) {
                                bj(bi)
                            }
                        }
                        bk = !this.collapsed
                    }
                    if (bk) {
                        if (az(bm)) {
                            if (bh == 0) {
                                bn(bm)
                            } else {
                                if (bh == bm.length) {
                                    bo = bm.nextSibling;
                                    if (bo && bo.nodeType == bm.nodeType) {
                                        if (bl == bo) {
                                            bl = bm;
                                            bf += bm.length
                                        }
                                        bm.appendData(bo.data);
                                        a0(bo)
                                    }
                                }
                            }
                        } else {
                            if (bh < bm.childNodes.length) {
                                var bg = bm.childNodes[bh];
                                if (bg && az(bg)) {
                                    bn(bg)
                                }
                            }
                        }
                    } else {
                        bm = bl;
                        bh = bf
                    }
                    be(this, bm, bh, bl, bf)
                },
                collapseToPoint: function (bf, bg) {
                    ac(bf, true);
                    aG(bf, bg);
                    this.setStartAndEnd(bf, bg)
                }
            });
            af(ba)
        }

        function at(a9) {
            a9.collapsed = (a9.startContainer === a9.endContainer && a9.startOffset === a9.endOffset);
            a9.commonAncestorContainer = a9.collapsed ? a9.startContainer : ag.getCommonAncestor(a9.startContainer, a9.endContainer)
        }

        function aQ(ba, bc, a9, bd, bb) {
            ba.startContainer = bc;
            ba.startOffset = a9;
            ba.endContainer = bd;
            ba.endOffset = bb;
            ba.document = ag.getDocument(bc);
            at(ba)
        }

        function ap(a9) {
            this.startContainer = a9;
            this.startOffset = 0;
            this.endContainer = a9;
            this.endOffset = 0;
            this.document = a9;
            at(this)
        }
        Z(ap, aQ);
        aV.extend(ap, {
            rangeProperties: aJ,
            RangeIterator: aj,
            copyComparisonConstants: af,
            createPrototypeRange: Z,
            inspect: a2,
            toHtml: T,
            getRangeDocument: aY,
            rangesEqual: function (ba, a9) {
                return ba.startContainer === a9.startContainer && ba.startOffset === a9.startOffset && ba.endContainer === a9.endContainer && ba.endOffset === a9.endOffset
            }
        });
        ad.DomRange = ap
    });
    h.createCoreModule("WrappedRange", ["DomRange"], function (aa, S) {
        var O, P;
        var W = aa.dom;
        var X = aa.util;
        var R = W.DomPosition;
        var ac = aa.DomRange;
        var Y = W.getBody;
        var ae = W.getContentDocument;
        var Z = W.isCharacterDataNode;
        if (aa.features.implementsDomRange) {
            (function () {
                var ai;
                var ap = ac.rangeProperties;

                function af(ar) {
                    var at = ap.length,
                        au;
                    while (at--) {
                        au = ap[at];
                        ar[au] = ar.nativeRange[au]
                    }
                    ar.collapsed = (ar.startContainer === ar.endContainer && ar.startOffset === ar.endOffset)
                }

                function ak(au, ax, at, ay, av) {
                    var ar = (au.startContainer !== ax || au.startOffset != at);
                    var az = (au.endContainer !== ay || au.endOffset != av);
                    var aw = !au.equals(au.nativeRange);
                    if (ar || az || aw) {
                        au.setEnd(ay, av);
                        au.setStart(ax, at)
                    }
                }
                var ah;
                O = function (ar) {
                    if (!ar) {
                        throw S.createError("WrappedRange: Range must be specified")
                    }
                    this.nativeRange = ar;
                    af(this)
                };
                ac.createPrototypeRange(O, ak);
                ai = O.prototype;
                ai.selectNode = function (ar) {
                    this.nativeRange.selectNode(ar);
                    af(this)
                };
                ai.cloneContents = function () {
                    return this.nativeRange.cloneContents()
                };
                ai.surroundContents = function (ar) {
                    this.nativeRange.surroundContents(ar);
                    af(this)
                };
                ai.collapse = function (ar) {
                    this.nativeRange.collapse(ar);
                    af(this)
                };
                ai.cloneRange = function () {
                    return new O(this.nativeRange.cloneRange())
                };
                ai.refresh = function () {
                    af(this)
                };
                ai.toString = function () {
                    return this.nativeRange.toString()
                };
                var ao = document.createTextNode("test");
                Y(document).appendChild(ao);
                var al = document.createRange();
                al.setStart(ao, 0);
                al.setEnd(ao, 0);
                try {
                    al.setStart(ao, 1);
                    ai.setStart = function (ar, at) {
                        this.nativeRange.setStart(ar, at);
                        af(this)
                    };
                    ai.setEnd = function (ar, at) {
                        this.nativeRange.setEnd(ar, at);
                        af(this)
                    };
                    ah = function (ar) {
                        return function (at) {
                            this.nativeRange[ar](at);
                            af(this)
                        }
                    }
                } catch (an) {
                    ai.setStart = function (at, au) {
                        try {
                            this.nativeRange.setStart(at, au)
                        } catch (ar) {
                            this.nativeRange.setEnd(at, au);
                            this.nativeRange.setStart(at, au)
                        }
                        af(this)
                    };
                    ai.setEnd = function (at, au) {
                        try {
                            this.nativeRange.setEnd(at, au)
                        } catch (ar) {
                            this.nativeRange.setStart(at, au);
                            this.nativeRange.setEnd(at, au)
                        }
                        af(this)
                    };
                    ah = function (ar, at) {
                        return function (av) {
                            try {
                                this.nativeRange[ar](av)
                            } catch (au) {
                                this.nativeRange[at](av);
                                this.nativeRange[ar](av)
                            }
                            af(this)
                        }
                    }
                }
                ai.setStartBefore = ah("setStartBefore", "setEndBefore");
                ai.setStartAfter = ah("setStartAfter", "setEndAfter");
                ai.setEndBefore = ah("setEndBefore", "setStartBefore");
                ai.setEndAfter = ah("setEndAfter", "setStartAfter");
                ai.selectNodeContents = function (ar) {
                    this.setStartAndEnd(ar, 0, W.getNodeLength(ar))
                };
                al.selectNodeContents(ao);
                al.setEnd(ao, 3);
                var aq = document.createRange();
                aq.selectNodeContents(ao);
                aq.setEnd(ao, 4);
                aq.setStart(ao, 2);
                if (al.compareBoundaryPoints(al.START_TO_END, aq) == -1 && al.compareBoundaryPoints(al.END_TO_START, aq) == 1) {
                    ai.compareBoundaryPoints = function (at, ar) {
                        ar = ar.nativeRange || ar;
                        if (at == ar.START_TO_END) {
                            at = ar.END_TO_START
                        } else {
                            if (at == ar.END_TO_START) {
                                at = ar.START_TO_END
                            }
                        }
                        return this.nativeRange.compareBoundaryPoints(at, ar)
                    }
                } else {
                    ai.compareBoundaryPoints = function (at, ar) {
                        return this.nativeRange.compareBoundaryPoints(at, ar.nativeRange || ar)
                    }
                }
                var ag = document.createElement("div");
                ag.innerHTML = "123";
                var aj = ag.firstChild;
                var am = Y(document);
                am.appendChild(ag);
                al.setStart(aj, 1);
                al.setEnd(aj, 2);
                al.deleteContents();
                if (aj.data == "13") {
                    ai.deleteContents = function () {
                        this.nativeRange.deleteContents();
                        af(this)
                    };
                    ai.extractContents = function () {
                        var ar = this.nativeRange.extractContents();
                        af(this);
                        return ar
                    }
                } else {}
                am.removeChild(ag);
                am = null;
                if (X.isHostMethod(al, "createContextualFragment")) {
                    ai.createContextualFragment = function (ar) {
                        return this.nativeRange.createContextualFragment(ar)
                    }
                }
                Y(document).removeChild(ao);
                ai.getName = function () {
                    return "WrappedRange"
                };
                aa.WrappedRange = O;
                aa.createNativeRange = function (ar) {
                    ar = ae(ar, S, "createNativeRange");
                    return ar.createRange()
                }
            })()
        }
        if (aa.features.implementsTextRange) {
            var T = function (ak) {
                var ai = ak.parentElement();
                var ag = ak.duplicate();
                ag.collapse(true);
                var aj = ag.parentElement();
                ag = ak.duplicate();
                ag.collapse(false);
                var ah = ag.parentElement();
                var af = (aj == ah) ? aj : W.getCommonAncestor(aj, ah);
                return af == ai ? af : W.getCommonAncestor(ai, af)
            };
            var Q = function (af) {
                return af.compareEndPoints("StartToEnd", af) == 0
            };
            var U = function (af, ar, ap, ag, aj) {
                var at = af.duplicate();
                at.collapse(ap);
                var ah = at.parentElement();
                if (!W.isOrIsAncestorOf(ar, ah)) {
                    ah = ar
                }
                if (!ah.canHaveHTML) {
                    var ao = new R(ah.parentNode, W.getNodeIndex(ah));
                    return {
                        boundaryPosition: ao,
                        nodeInfo: {
                            nodeIndex: ao.offset,
                            containerElement: ao.node
                        }
                    }
                }
                var ai = W.getDocument(ah).createElement("span");
                if (ai.parentNode) {
                    W.removeNode(ai)
                }
                var aB, az = ap ? "StartToStart" : "StartToEnd";
                var au, ak, aq, av;
                var am = (aj && aj.containerElement == ah) ? aj.nodeIndex : 0;
                var aw = ah.childNodes.length;
                var al = aw;
                var ay = al;
                while (true) {
                    if (ay == aw) {
                        ah.appendChild(ai)
                    } else {
                        ah.insertBefore(ai, ah.childNodes[ay])
                    }
                    at.moveToElementText(ai);
                    aB = at.compareEndPoints(az, af);
                    if (aB == 0 || am == al) {
                        break
                    } else {
                        if (aB == -1) {
                            if (al == am + 1) {
                                break
                            } else {
                                am = ay
                            }
                        } else {
                            al = (al == am + 1) ? am : ay
                        }
                    }
                    ay = Math.floor((am + al) / 2);
                    ah.removeChild(ai)
                }
                av = ai.nextSibling;
                if (aB == -1 && av && Z(av)) {
                    at.setEndPoint(ap ? "EndToStart" : "EndToEnd", af);
                    var an;
                    if (/[\r\n]/.test(av.data)) {
                        var ax = at.duplicate();
                        var aA = ax.text.replace(/\r\n/g, "\r").length;
                        an = ax.moveStart("character", aA);
                        while ((aB = ax.compareEndPoints("StartToEnd", ax)) == -1) {
                            an++;
                            ax.moveStart("character", 1)
                        }
                    } else {
                        an = at.text.length
                    }
                    aq = new R(av, an)
                } else {
                    au = (ag || !ap) && ai.previousSibling;
                    ak = (ag || ap) && ai.nextSibling;
                    if (ak && Z(ak)) {
                        aq = new R(ak, 0)
                    } else {
                        if (au && Z(au)) {
                            aq = new R(au, au.data.length)
                        } else {
                            aq = new R(ah, W.getNodeIndex(ai))
                        }
                    }
                }
                W.removeNode(ai);
                return {
                    boundaryPosition: aq,
                    nodeInfo: {
                        nodeIndex: ay,
                        containerElement: ah
                    }
                }
            };
            var ad = function (af, ah) {
                var ai, al, aj = af.offset;
                var am = W.getDocument(af.node);
                var ag, an, ao = Y(am).createTextRange();
                var ak = Z(af.node);
                if (ak) {
                    ai = af.node;
                    al = ai.parentNode
                } else {
                    an = af.node.childNodes;
                    ai = (aj < an.length) ? an[aj] : null;
                    al = af.node
                }
                ag = am.createElement("span");
                ag.innerHTML = "&#feff;";
                if (ai) {
                    al.insertBefore(ag, ai)
                } else {
                    al.appendChild(ag)
                }
                ao.moveToElementText(ag);
                ao.collapse(!ah);
                al.removeChild(ag);
                if (ak) {
                    ao[ah ? "moveStart" : "moveEnd"]("character", aj)
                }
                return ao
            };
            P = function (af) {
                this.textRange = af;
                this.refresh()
            };
            P.prototype = new ac(document);
            P.prototype.refresh = function () {
                var ai, af, ah;
                var ag = T(this.textRange);
                if (Q(this.textRange)) {
                    af = ai = U(this.textRange, ag, true, true).boundaryPosition
                } else {
                    ah = U(this.textRange, ag, true, false);
                    ai = ah.boundaryPosition;
                    af = U(this.textRange, ag, false, false, ah.nodeInfo).boundaryPosition
                }
                this.setStart(ai.node, ai.offset);
                this.setEnd(af.node, af.offset)
            };
            P.prototype.getName = function () {
                return "WrappedTextRange"
            };
            ac.copyComparisonConstants(P);
            var ab = function (af) {
                if (af.collapsed) {
                    return ad(new R(af.startContainer, af.startOffset), true)
                } else {
                    var ai = ad(new R(af.startContainer, af.startOffset), true);
                    var ah = ad(new R(af.endContainer, af.endOffset), false);
                    var ag = Y(ac.getRangeDocument(af)).createTextRange();
                    ag.setEndPoint("StartToStart", ai);
                    ag.setEndPoint("EndToEnd", ah);
                    return ag
                }
            };
            P.rangeToTextRange = ab;
            P.prototype.toTextRange = function () {
                return ab(this)
            };
            aa.WrappedTextRange = P;
            if (!aa.features.implementsDomRange || aa.config.preferTextRange) {
                var V = (function (af) {
                    return af("return this;")()
                })(Function);
                if (typeof V.Range == "undefined") {
                    V.Range = P
                }
                aa.createNativeRange = function (af) {
                    af = ae(af, S, "createNativeRange");
                    return Y(af).createTextRange()
                };
                aa.WrappedRange = P
            }
        }
        aa.createRange = function (af) {
            af = ae(af, S, "createRange");
            return new aa.WrappedRange(aa.createNativeRange(af))
        };
        aa.createRangyRange = function (af) {
            af = ae(af, S, "createRangyRange");
            return new ac(af)
        };
        X.createAliasForDeprecatedMethod(aa, "createIframeRange", "createRange");
        X.createAliasForDeprecatedMethod(aa, "createIframeRangyRange", "createRangyRange");
        aa.addShimListener(function (ag) {
            var af = ag.document;
            if (typeof af.createRange == "undefined") {
                af.createRange = function () {
                    return aa.createRange(af)
                }
            }
            af = ag = null
        })
    });
    h.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function (X, R) {
        X.config.checkSelectionRanges = true;
        var ax = "boolean";
        var aA = "number";
        var Q = X.dom;
        var ac = X.util;
        var aL = ac.isHostMethod;
        var aP = X.DomRange;
        var T = X.WrappedRange;
        var aK = X.DOMException;
        var ar = Q.DomPosition;
        var aH;
        var ae;
        var ab = X.features;
        var aX = "Control";
        var aW = Q.getDocument;
        var aV = Q.getBody;
        var aC = aP.rangesEqual;

        function U(aZ) {
            return (typeof aZ == "string") ? /^backward(s)?$/i.test(aZ) : !!aZ
        }

        function an(a1, aZ) {
            if (!a1) {
                return window
            } else {
                if (Q.isWindow(a1)) {
                    return a1
                } else {
                    if (a1 instanceof au) {
                        return a1.win
                    } else {
                        var a0 = Q.getContentDocument(a1, R, aZ);
                        return Q.getWindow(a0)
                    }
                }
            }
        }

        function ad(aZ) {
            return an(aZ, "getWinSelection").getSelection()
        }

        function ah(aZ) {
            return an(aZ, "getDocSelection").document.selection
        }

        function aU(aZ) {
            var a0 = false;
            if (aZ.anchorNode) {
                a0 = (Q.comparePoints(aZ.anchorNode, aZ.anchorOffset, aZ.focusNode, aZ.focusOffset) == 1)
            }
            return a0
        }
        var aS = aL(window, "getSelection"),
            aJ = ac.isHostObject(document, "selection");
        ab.implementsWinGetSelection = aS;
        ab.implementsDocSelection = aJ;
        var ak = aJ && (!aS || X.config.preferTextRange);
        if (ak) {
            aH = ah;
            X.isSelectionValid = function (a0) {
                var a1 = an(a0, "isSelectionValid").document,
                    aZ = a1.selection;
                return (aZ.type != "None" || aW(aZ.createRange().parentElement()) == a1)
            }
        } else {
            if (aS) {
                aH = ad;
                X.isSelectionValid = function () {
                    return true
                }
            } else {
                R.fail("Neither document.selection or window.getSelection() detected.");
                return false
            }
        }
        X.getNativeSelection = aH;
        var aI = aH();
        if (!aI) {
            R.fail("Native selection was null (possibly issue 138?)");
            return false
        }
        var av = X.createNativeRange(document);
        var aw = aV(document);
        var aF = ac.areHostProperties(aI, ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);
        ab.selectionHasAnchorAndFocus = aF;
        var ag = aL(aI, "extend");
        ab.selectionHasExtend = ag;
        var aY = (typeof aI.rangeCount == aA);
        ab.selectionHasRangeCount = aY;
        var aO = false;
        var aM = true;
        var ao = ag ? function (a2, aZ) {
            var a1 = aP.getRangeDocument(aZ);
            var a0 = X.createRange(a1);
            a0.collapseToPoint(aZ.endContainer, aZ.endOffset);
            a2.addRange(aE(a0));
            a2.extend(aZ.startContainer, aZ.startOffset)
        } : null;
        if (ac.areHostMethods(aI, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof aI.rangeCount == aA && ab.implementsDomRange) {
            (function () {
                var a0 = window.getSelection();
                if (a0) {
                    var a4 = a0.rangeCount;
                    var a6 = (a4 > 1);
                    var a7 = [];
                    var a9 = aU(a0);
                    for (var a5 = 0; a5 < a4; ++a5) {
                        a7[a5] = a0.getRangeAt(a5)
                    }
                    var a2 = Q.createTestElement(document, "", false);
                    var a3 = a2.appendChild(document.createTextNode("\u00a0\u00a0\u00a0"));
                    var a1 = document.createRange();
                    a1.setStart(a3, 1);
                    a1.collapse(true);
                    a0.removeAllRanges();
                    a0.addRange(a1);
                    aM = (a0.rangeCount == 1);
                    a0.removeAllRanges();
                    if (!a6) {
                        var a8 = window.navigator.appVersion.match(/Chrome\/(.*?) /);
                        if (a8 && parseInt(a8[1]) >= 36) {
                            aO = false
                        } else {
                            var aZ = a1.cloneRange();
                            a1.setStart(a3, 0);
                            aZ.setEnd(a3, 3);
                            aZ.setStart(a3, 2);
                            a0.addRange(a1);
                            a0.addRange(aZ);
                            aO = (a0.rangeCount == 2)
                        }
                    }
                    Q.removeNode(a2);
                    a0.removeAllRanges();
                    for (a5 = 0; a5 < a4; ++a5) {
                        if (a5 == 0 && a9) {
                            if (ao) {
                                ao(a0, a7[a5])
                            } else {
                                X.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend");
                                a0.addRange(a7[a5])
                            }
                        } else {
                            a0.addRange(a7[a5])
                        }
                    }
                }
            })()
        }
        ab.selectionSupportsMultipleRanges = aO;
        ab.collapsedNonEditableSelectionsSupported = aM;
        var W = false,
            Z;
        if (aw && aL(aw, "createControlRange")) {
            Z = aw.createControlRange();
            if (ac.areHostProperties(Z, ["item", "add"])) {
                W = true
            }
        }
        ab.implementsControlRange = W;
        if (aF) {
            ae = function (aZ) {
                return aZ.anchorNode === aZ.focusNode && aZ.anchorOffset === aZ.focusOffset
            }
        } else {
            ae = function (aZ) {
                return aZ.rangeCount ? aZ.getRangeAt(aZ.rangeCount - 1).collapsed : false
            }
        }

        function P(a1, aZ, a2) {
            var a0 = a2 ? "end" : "start",
                a3 = a2 ? "start" : "end";
            a1.anchorNode = aZ[a0 + "Container"];
            a1.anchorOffset = aZ[a0 + "Offset"];
            a1.focusNode = aZ[a3 + "Container"];
            a1.focusOffset = aZ[a3 + "Offset"]
        }

        function am(a0) {
            var aZ = a0.nativeSelection;
            a0.anchorNode = aZ.anchorNode;
            a0.anchorOffset = aZ.anchorOffset;
            a0.focusNode = aZ.focusNode;
            a0.focusOffset = aZ.focusOffset
        }

        function aB(aZ) {
            aZ.anchorNode = aZ.focusNode = null;
            aZ.anchorOffset = aZ.focusOffset = 0;
            aZ.rangeCount = 0;
            aZ.isCollapsed = true;
            aZ._ranges.length = 0
        }

        function aE(aZ) {
            var a0;
            if (aZ instanceof aP) {
                a0 = X.createNativeRange(aZ.getDocument());
                a0.setEnd(aZ.endContainer, aZ.endOffset);
                a0.setStart(aZ.startContainer, aZ.startOffset)
            } else {
                if (aZ instanceof T) {
                    a0 = aZ.nativeRange
                } else {
                    if (ab.implementsDomRange && (aZ instanceof Q.getWindow(aZ.startContainer).Range)) {
                        a0 = aZ
                    }
                }
            }
            return a0
        }

        function aa(a1) {
            if (!a1.length || a1[0].nodeType != 1) {
                return false
            }
            for (var a0 = 1, aZ = a1.length; a0 < aZ; ++a0) {
                if (!Q.isAncestorOf(a1[0], a1[a0])) {
                    return false
                }
            }
            return true
        }

        function aG(a0) {
            var aZ = a0.getNodes();
            if (!aa(aZ)) {
                throw R.createError("getSingleElementFromRange: range " + a0.inspect() + " did not consist of a single element")
            }
            return aZ[0]
        }

        function az(aZ) {
            return !!aZ && typeof aZ.text != "undefined"
        }

        function aD(a1, a0) {
            var aZ = new T(a0);
            a1._ranges = [aZ];
            P(a1, aZ, false);
            a1.rangeCount = 1;
            a1.isCollapsed = aZ.collapsed
        }

        function aj(a2) {
            a2._ranges.length = 0;
            if (a2.docSelection.type == "None") {
                aB(a2)
            } else {
                var a1 = a2.docSelection.createRange();
                if (az(a1)) {
                    aD(a2, a1)
                } else {
                    a2.rangeCount = a1.length;
                    var aZ, a3 = aW(a1.item(0));
                    for (var a0 = 0; a0 < a2.rangeCount; ++a0) {
                        aZ = X.createRange(a3);
                        aZ.selectNode(a1.item(a0));
                        a2._ranges.push(aZ)
                    }
                    a2.isCollapsed = a2.rangeCount == 1 && a2._ranges[0].collapsed;
                    P(a2, a2._ranges[a2.rangeCount - 1], false)
                }
            }
        }

        function aq(a0, a3) {
            var a1 = a0.docSelection.createRange();
            var aZ = aG(a3);
            var a7 = aW(a1.item(0));
            var a4 = aV(a7).createControlRange();
            for (var a2 = 0, a5 = a1.length; a2 < a5; ++a2) {
                a4.add(a1.item(a2))
            }
            try {
                a4.add(aZ)
            } catch (a6) {
                throw R.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")
            }
            a4.select();
            aj(a0)
        }
        var af;
        if (aL(aI, "getRangeAt")) {
            af = function (a1, aZ) {
                try {
                    return a1.getRangeAt(aZ)
                } catch (a0) {
                    return null
                }
            }
        } else {
            if (aF) {
                af = function (a0) {
                    var a1 = aW(a0.anchorNode);
                    var aZ = X.createRange(a1);
                    aZ.setStartAndEnd(a0.anchorNode, a0.anchorOffset, a0.focusNode, a0.focusOffset);
                    if (aZ.collapsed !== this.isCollapsed) {
                        aZ.setStartAndEnd(a0.focusNode, a0.focusOffset, a0.anchorNode, a0.anchorOffset)
                    }
                    return aZ
                }
            }
        }

        function au(aZ, a1, a0) {
            this.nativeSelection = aZ;
            this.docSelection = a1;
            this._ranges = [];
            this.win = a0;
            this.refresh()
        }
        au.prototype = X.selectionPrototype;

        function ap(aZ) {
            aZ.win = aZ.anchorNode = aZ.focusNode = aZ._ranges = null;
            aZ.rangeCount = aZ.anchorOffset = aZ.focusOffset = 0;
            aZ.detached = true
        }
        var aT = [];

        function aN(a3, a2) {
            var aZ = aT.length,
                a0, a1;
            while (aZ--) {
                a0 = aT[aZ];
                a1 = a0.selection;
                if (a2 == "deleteAll") {
                    ap(a1)
                } else {
                    if (a0.win == a3) {
                        if (a2 == "delete") {
                            aT.splice(aZ, 1);
                            return true
                        } else {
                            return a1
                        }
                    }
                }
            }
            if (a2 == "deleteAll") {
                aT.length = 0
            }
            return null
        }
        var al = function (a1) {
            if (a1 && a1 instanceof au) {
                a1.refresh();
                return a1
            }
            a1 = an(a1, "getNativeSelection");
            var a0 = aN(a1);
            var aZ = aH(a1),
                a2 = aJ ? ah(a1) : null;
            if (a0) {
                a0.nativeSelection = aZ;
                a0.docSelection = a2;
                a0.refresh()
            } else {
                a0 = new au(aZ, a2, a1);
                aT.push({
                    win: a1,
                    selection: a0
                })
            }
            return a0
        };
        X.getSelection = al;
        ac.createAliasForDeprecatedMethod(X, "getIframeSelection", "getSelection");
        var O = au.prototype;

        function Y(a5, a0) {
            var a6 = aW(a0[0].startContainer);
            var a3 = aV(a6).createControlRange();
            for (var a2 = 0, a4, aZ = a0.length; a2 < aZ; ++a2) {
                a4 = aG(a0[a2]);
                try {
                    a3.add(a4)
                } catch (a1) {
                    throw R.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)")
                }
            }
            a3.select();
            aj(a5)
        }
        if (!ak && aF && ac.areHostMethods(aI, ["removeAllRanges", "addRange"])) {
            O.removeAllRanges = function () {
                this.nativeSelection.removeAllRanges();
                aB(this)
            };
            var S = function (a0, aZ) {
                ao(a0.nativeSelection, aZ);
                a0.refresh()
            };
            if (aY) {
                O.addRange = function (a0, a4) {
                    if (W && aJ && this.docSelection.type == aX) {
                        aq(this, a0)
                    } else {
                        if (U(a4) && ag) {
                            S(this, a0)
                        } else {
                            var a2;
                            if (aO) {
                                a2 = this.rangeCount
                            } else {
                                this.removeAllRanges();
                                a2 = 0
                            }
                            var aZ = aE(a0).cloneRange();
                            try {
                                this.nativeSelection.addRange(aZ)
                            } catch (a1) {}
                            this.rangeCount = this.nativeSelection.rangeCount;
                            if (this.rangeCount == a2 + 1) {
                                if (X.config.checkSelectionRanges) {
                                    var a3 = af(this.nativeSelection, this.rangeCount - 1);
                                    if (a3 && !aC(a3, a0)) {
                                        a0 = new T(a3)
                                    }
                                }
                                this._ranges[this.rangeCount - 1] = a0;
                                P(this, a0, V(this.nativeSelection));
                                this.isCollapsed = ae(this)
                            } else {
                                this.refresh()
                            }
                        }
                    }
                }
            } else {
                O.addRange = function (aZ, a0) {
                    if (U(a0) && ag) {
                        S(this, aZ)
                    } else {
                        this.nativeSelection.addRange(aE(aZ));
                        this.refresh()
                    }
                }
            }
            O.setRanges = function (a0) {
                if (W && aJ && a0.length > 1) {
                    Y(this, a0)
                } else {
                    this.removeAllRanges();
                    for (var a1 = 0, aZ = a0.length; a1 < aZ; ++a1) {
                        this.addRange(a0[a1])
                    }
                }
            }
        } else {
            if (aL(aI, "empty") && aL(av, "select") && W && ak) {
                O.removeAllRanges = function () {
                    try {
                        this.docSelection.empty();
                        if (this.docSelection.type != "None") {
                            var a2;
                            if (this.anchorNode) {
                                a2 = aW(this.anchorNode)
                            } else {
                                if (this.docSelection.type == aX) {
                                    var a0 = this.docSelection.createRange();
                                    if (a0.length) {
                                        a2 = aW(a0.item(0))
                                    }
                                }
                            }
                            if (a2) {
                                var a1 = aV(a2).createTextRange();
                                a1.select();
                                this.docSelection.empty()
                            }
                        }
                    } catch (aZ) {}
                    aB(this)
                };
                O.addRange = function (aZ) {
                    if (this.docSelection.type == aX) {
                        aq(this, aZ)
                    } else {
                        X.WrappedTextRange.rangeToTextRange(aZ).select();
                        this._ranges[0] = aZ;
                        this.rangeCount = 1;
                        this.isCollapsed = this._ranges[0].collapsed;
                        P(this, aZ, false)
                    }
                };
                O.setRanges = function (aZ) {
                    this.removeAllRanges();
                    var a0 = aZ.length;
                    if (a0 > 1) {
                        Y(this, aZ)
                    } else {
                        if (a0) {
                            this.addRange(aZ[0])
                        }
                    }
                }
            } else {
                R.fail("No means of selecting a Range or TextRange was found");
                return false
            }
        }
        O.getRangeAt = function (aZ) {
            if (aZ < 0 || aZ >= this.rangeCount) {
                throw new aK("INDEX_SIZE_ERR")
            } else {
                return this._ranges[aZ].cloneRange()
            }
        };
        var ay;
        if (ak) {
            ay = function (a0) {
                var aZ;
                if (X.isSelectionValid(a0.win)) {
                    aZ = a0.docSelection.createRange()
                } else {
                    aZ = aV(a0.win.document).createTextRange();
                    aZ.collapse(true)
                }
                if (a0.docSelection.type == aX) {
                    aj(a0)
                } else {
                    if (az(aZ)) {
                        aD(a0, aZ)
                    } else {
                        aB(a0)
                    }
                }
            }
        } else {
            if (aL(aI, "getRangeAt") && typeof aI.rangeCount == aA) {
                ay = function (a1) {
                    if (W && aJ && a1.docSelection.type == aX) {
                        aj(a1)
                    } else {
                        a1._ranges.length = a1.rangeCount = a1.nativeSelection.rangeCount;
                        if (a1.rangeCount) {
                            for (var a0 = 0, aZ = a1.rangeCount; a0 < aZ; ++a0) {
                                a1._ranges[a0] = new X.WrappedRange(a1.nativeSelection.getRangeAt(a0))
                            }
                            P(a1, a1._ranges[a1.rangeCount - 1], V(a1.nativeSelection));
                            a1.isCollapsed = ae(a1)
                        } else {
                            aB(a1)
                        }
                    }
                }
            } else {
                if (aF && typeof aI.isCollapsed == ax && typeof av.collapsed == ax && ab.implementsDomRange) {
                    ay = function (a1) {
                        var aZ, a0 = a1.nativeSelection;
                        if (a0.anchorNode) {
                            aZ = af(a0, 0);
                            a1._ranges = [aZ];
                            a1.rangeCount = 1;
                            am(a1);
                            a1.isCollapsed = ae(a1)
                        } else {
                            aB(a1)
                        }
                    }
                } else {
                    R.fail("No means of obtaining a Range or TextRange from the user's selection was found");
                    return false
                }
            }
        }
        O.refresh = function (a0) {
            var aZ = a0 ? this._ranges.slice(0) : null;
            var a2 = this.anchorNode,
                a3 = this.anchorOffset;
            ay(this);
            if (a0) {
                var a1 = aZ.length;
                if (a1 != this._ranges.length) {
                    return true
                }
                if (this.anchorNode != a2 || this.anchorOffset != a3) {
                    return true
                }
                while (a1--) {
                    if (!aC(aZ[a1], this._ranges[a1])) {
                        return true
                    }
                }
                return false
            }
        };
        var at = function (a3, a1) {
            var a0 = a3.getAllRanges();
            a3.removeAllRanges();
            for (var a2 = 0, aZ = a0.length; a2 < aZ; ++a2) {
                if (!aC(a1, a0[a2])) {
                    a3.addRange(a0[a2])
                }
            }
            if (!a3.rangeCount) {
                aB(a3)
            }
        };
        if (W && aJ) {
            O.removeRange = function (a3) {
                if (this.docSelection.type == aX) {
                    var a1 = this.docSelection.createRange();
                    var aZ = aG(a3);
                    var a7 = aW(a1.item(0));
                    var a5 = aV(a7).createControlRange();
                    var a0, a6 = false;
                    for (var a2 = 0, a4 = a1.length; a2 < a4; ++a2) {
                        a0 = a1.item(a2);
                        if (a0 !== aZ || a6) {
                            a5.add(a1.item(a2))
                        } else {
                            a6 = true
                        }
                    }
                    a5.select();
                    aj(this)
                } else {
                    at(this, a3)
                }
            }
        } else {
            O.removeRange = function (aZ) {
                at(this, aZ)
            }
        }
        var V;
        if (!ak && aF && ab.implementsDomRange) {
            V = aU;
            O.isBackward = function () {
                return V(this)
            }
        } else {
            V = O.isBackward = function () {
                return false
            }
        }
        O.isBackwards = O.isBackward;
        O.toString = function () {
            var a1 = [];
            for (var a0 = 0, aZ = this.rangeCount; a0 < aZ; ++a0) {
                a1[a0] = "" + this._ranges[a0]
            }
            return a1.join("")
        };

        function aQ(a0, aZ) {
            if (a0.win.document != aW(aZ)) {
                throw new aK("WRONG_DOCUMENT_ERR")
            }
        }
        O.collapse = function (a0, a1) {
            aQ(this, a0);
            var aZ = X.createRange(a0);
            aZ.collapseToPoint(a0, a1);
            this.setSingleRange(aZ);
            this.isCollapsed = true
        };
        O.collapseToStart = function () {
            if (this.rangeCount) {
                var aZ = this._ranges[0];
                this.collapse(aZ.startContainer, aZ.startOffset)
            } else {
                throw new aK("INVALID_STATE_ERR")
            }
        };
        O.collapseToEnd = function () {
            if (this.rangeCount) {
                var aZ = this._ranges[this.rangeCount - 1];
                this.collapse(aZ.endContainer, aZ.endOffset)
            } else {
                throw new aK("INVALID_STATE_ERR")
            }
        };
        O.selectAllChildren = function (a0) {
            aQ(this, a0);
            var aZ = X.createRange(a0);
            aZ.selectNodeContents(a0);
            this.setSingleRange(aZ)
        };
        O.deleteFromDocument = function () {
            if (W && aJ && this.docSelection.type == aX) {
                var a3 = this.docSelection.createRange();
                var a2;
                while (a3.length) {
                    a2 = a3.item(0);
                    a3.remove(a2);
                    Q.removeNode(a2)
                }
                this.refresh()
            } else {
                if (this.rangeCount) {
                    var a0 = this.getAllRanges();
                    if (a0.length) {
                        this.removeAllRanges();
                        for (var a1 = 0, aZ = a0.length; a1 < aZ; ++a1) {
                            a0[a1].deleteContents()
                        }
                        this.addRange(a0[aZ - 1])
                    }
                }
            }
        };
        O.eachRange = function (a2, a1) {
            for (var a0 = 0, aZ = this._ranges.length; a0 < aZ; ++a0) {
                if (a2(this.getRangeAt(a0))) {
                    return a1
                }
            }
        };
        O.getAllRanges = function () {
            var aZ = [];
            this.eachRange(function (a0) {
                aZ.push(a0)
            });
            return aZ
        };
        O.setSingleRange = function (aZ, a0) {
            this.removeAllRanges();
            this.addRange(aZ, a0)
        };
        O.callMethodOnEachRange = function (aZ, a1) {
            var a0 = [];
            this.eachRange(function (a2) {
                a0.push(a2[aZ].apply(a2, a1 || []))
            });
            return a0
        };

        function aR(aZ) {
            return function (a1, a2) {
                var a0;
                if (this.rangeCount) {
                    a0 = this.getRangeAt(0);
                    a0["set" + (aZ ? "Start" : "End")](a1, a2)
                } else {
                    a0 = X.createRange(this.win.document);
                    a0.setStartAndEnd(a1, a2)
                }
                this.setSingleRange(a0, this.isBackward())
            }
        }
        O.setStart = aR(true);
        O.setEnd = aR(false);
        X.rangePrototype.select = function (aZ) {
            al(this.getDocument()).setSingleRange(this, aZ)
        };
        O.changeEachRange = function (a0) {
            var aZ = [];
            var a1 = this.isBackward();
            this.eachRange(function (a2) {
                a0(a2);
                aZ.push(a2)
            });
            this.removeAllRanges();
            if (a1 && aZ.length == 1) {
                this.addRange(aZ[0], "backward")
            } else {
                this.setRanges(aZ)
            }
        };
        O.containsNode = function (a0, aZ) {
            return this.eachRange(function (a1) {
                return a1.containsNode(a0, aZ)
            }, true) || false
        };
        O.getBookmark = function (aZ) {
            return {
                backward: this.isBackward(),
                rangeBookmarks: this.callMethodOnEachRange("getBookmark", [aZ])
            }
        };
        O.moveToBookmark = function (a3) {
            var aZ = [];
            for (var a2 = 0, a1, a0; a1 = a3.rangeBookmarks[a2++];) {
                a0 = X.createRange(this.win);
                a0.moveToBookmark(a1);
                aZ.push(a0)
            }
            if (a3.backward) {
                this.setSingleRange(aZ[0], "backward")
            } else {
                this.setRanges(aZ)
            }
        };
        O.saveRanges = function () {
            return {
                backward: this.isBackward(),
                ranges: this.callMethodOnEachRange("cloneRange")
            }
        };
        O.restoreRanges = function (aZ) {
            this.removeAllRanges();
            for (var a1 = 0, a0; a0 = aZ.ranges[a1]; ++a1) {
                this.addRange(a0, (aZ.backward && a1 == 0))
            }
        };
        O.toHtml = function () {
            var aZ = [];
            this.eachRange(function (a0) {
                aZ.push(aP.toHtml(a0))
            });
            return aZ.join("")
        };
        if (ab.implementsTextRange) {
            O.getNativeTextRange = function () {
                var a1, a0;
                if ((a1 = this.docSelection)) {
                    var aZ = a1.createRange();
                    if (az(aZ)) {
                        return aZ
                    } else {
                        throw R.createError("getNativeTextRange: selection is a control selection")
                    }
                } else {
                    if (this.rangeCount > 0) {
                        return X.WrappedTextRange.rangeToTextRange(this.getRangeAt(0))
                    } else {
                        throw R.createError("getNativeTextRange: selection contains no range")
                    }
                }
            }
        }

        function ai(a5) {
            var a4 = [];
            var a2 = new ar(a5.anchorNode, a5.anchorOffset);
            var a0 = new ar(a5.focusNode, a5.focusOffset);
            var a1 = (typeof a5.getName == "function") ? a5.getName() : "Selection";
            if (typeof a5.rangeCount != "undefined") {
                for (var a3 = 0, aZ = a5.rangeCount; a3 < aZ; ++a3) {
                    a4[a3] = aP.inspect(a5.getRangeAt(a3))
                }
            }
            return "[" + a1 + "(Ranges: " + a4.join(", ") + ")(anchor: " + a2.inspect() + ", focus: " + a0.inspect() + "]"
        }
        O.getName = function () {
            return "WrappedSelection"
        };
        O.inspect = function () {
            return ai(this)
        };
        O.detach = function () {
            aN(this.win, "delete");
            ap(this)
        };
        au.detachAll = function () {
            aN(null, "deleteAll")
        };
        au.inspect = ai;
        au.isDirectionBackward = U;
        X.Selection = au;
        X.selectionPrototype = O;
        X.addShimListener(function (aZ) {
            if (typeof aZ.getSelection == "undefined") {
                aZ.getSelection = function () {
                    return al(aZ)
                }
            }
            aZ = null
        })
    });
    var e = false;
    var L = function (O) {
        if (!e) {
            e = true;
            if (!h.initialized && h.config.autoInitialize) {
                K()
            }
        }
    };
    if (C) {
        if (document.readyState == "complete") {
            L()
        } else {
            if (D(document, "addEventListener")) {
                document.addEventListener("DOMContentLoaded", L, false)
            }
            i(window, "load", L)
        }
    }
    return h
}, this);
(function (q, e) {
    var d = window || {},
        c = q.rangy || d.rangy,
        m, h;
    q.rangy = c;
    var j = "br",
        w = "p",
        s = "insertType",
        r = "deleteType",
        i = [{
            start: 0,
            end: 31
        }, {
            start: 33,
            end: 40
        }, {
            start: 45,
            end: 45
        }, {
            start: 91,
            end: 93
        }, {
            start: 112,
            end: 123
        }, {
            start: 144,
            end: 145
        }],
        b = {
            block: 1,
            table: 1,
            flex: 1,
            grid: 1
        },
        m = {
            attributes: {
                changeId: "data-cid",
                userId: "data-userid",
                userName: "data-username",
                sessionId: "data-session-id",
                time: "data-time",
                lastTime: "data-last-change-time",
                changeData: "data-changedata"
            },
            classes: {
                block: "lite-block"
            },
            attrValuePrefix: "",
            blockEl: "p",
            blockEls: ["div", "p", "ol", "ul", "li", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote"],
            stylePrefix: "cts",
            currentUser: {
                id: null,
                name: null
            },
            changeTypes: {
                insertType: {
                    tag: "ins",
                    alias: "ins",
                    action: "Inserted"
                },
                deleteType: {
                    tag: "del",
                    alias: "del",
                    action: "Deleted"
                }
            },
            contentEditable: undefined,
            _isTracking: true,
            tooltips: false,
            tooltipsDelay: 1,
            _isVisible: true,
            _changeData: null,
            _handleSelectAll: false,
            _sessionId: null
        };

    function o(C) {
        if (!C) {
            return true
        }
        var B, A = i.length,
            D;
        for (B = 0; B < A; ++B) {
            D = i[B];
            if (C >= D.start && C <= D.end) {
                return true
            }
        }
        return false
    }
    h = function (B) {
        B || (B = {});
        if (!B.element) {
            throw new Error("options.element must be defined for ice construction.")
        }
        this._changes = {};
        this._userStyles = {};
        this.currentUser = {
            name: "",
            id: ""
        };
        this._styles = {};
        this._savedNodesMap = {};
        this.$this = e(this);
        this._browser = q.dom.browser();
        this._tooltipMouseOver = this._tooltipMouseOver.bind(this);
        this._tooltipMouseOut = this._tooltipMouseOut.bind(this);
        e.extend(true, this, m, B);
        if (B.tooltips && (!e.isFunction(B.hostMethods.showTooltip) || !e.isFunction(B.hostMethods.hideTooltip))) {
            throw new Error("hostMethods.showTooltip and hostMethods.hideTooltip must be defined if tooltips is true")
        }
        var C = B.userStyles || {};
        for (var D in C) {
            if (C.hasOwnProperty(D)) {
                var A = C[D];
                if (!isNaN(A)) {
                    this._userStyles[D] = this.stylePrefix + "-" + A;
                    this._uniqueStyleIndex = Math.max(A, this._uniqueStyleIndex);
                    this._styles[A] = true
                }
            }
        }
        v = B.hostMethods.logError || function () {
            return undefined
        };
        this._insertSelector = "." + this._getIceNodeClass(s);
        this._deleteSelector = "." + this._getIceNodeClass(r);
        this._iceSelector = this._insertSelector + "," + this._deleteSelector
    };
    h.prototype = {
        _uniqueStyleIndex: 0,
        _browserType: null,
        _batchChangeId: null,
        _uniqueIDIndex: 1,
        _delBookmark: "tempdel",
        isPlaceHoldingDeletes: false,
        startTracking: function (A) {
            if (typeof (this.contentEditable) == "boolean") {
                this.element.setAttribute("contentEditable", this.contentEditable)
            }
            this.initializeEnvironment();
            this.initializeEditor();
            this.initializeRange();
            this._updateTooltipsState();
            return this
        },
        stopTracking: function (B) {
            this._isTracking = false;
            try {
                var A = this.element;
                if (A) {
                    this.unlistenToEvents()
                }
                if (!B && (typeof (this.contentEditable) !== "undefined")) {
                    this.element.setAttribute("contentEditable", !this.contentEditable)
                }
            } catch (A) {
                v(A, "While trying to stop tracking")
            }
            this._updateTooltipsState();
            return this
        },
        listenToEvents: function () {
            if (this.element && !this._boundEventHandler) {
                this.unlistenToEvents();
                this._boundEventHandler = this.handleEvent.bind(this);
                this.element.addEventListener("keydown", this._boundEventHandler, true)
            }
        },
        unlistenToEvents: function () {
            if (this.element && this._boundEventHandler) {
                this.element.removeEventListener("keydown", this._boundEventHandler, true)
            }
            this._boundEventHandler = null
        },
        initializeEnvironment: function () {
            this.env || (this.env = {});
            this.env.element = this.element;
            this.env.document = this.element.ownerDocument;
            this.env.window = this.env.document.defaultView || this.env.document.parentWindow || window;
            this.env.frame = this.env.window.frameElement;
            this.env.selection = this.selection = new q.Selection(this.env)
        },
        initializeRange: function () {},
        initializeEditor: function () {
            this._loadFromDom();
            this._updateTooltipsState()
        },
        isTracking: function () {
            return this._isTracking
        },
        enableChangeTracking: function () {
            this._isTracking = true
        },
        disableChangeTracking: function () {
            this._isTracking = false
        },
        toggleChangeTracking: function (A) {
            A = (undefined === A) ? !this._isTracking : Boolean(A);
            this._isTracking = A
        },
        getCurrentUser: function () {
            var A = this.currentUser || {},
                B = (A.id === null || A.id === undefined) ? "" : String(A.id);
            return {
                name: A.name || "",
                id: B
            }
        },
        setCurrentUser: function (F) {
            var C = {};
            F = F || {};
            C.name = F.name ? String(F.name) : "";
            if (F.id !== undefined && F.id !== null) {
                C.id = String(F.id)
            } else {
                C.id = ""
            }
            this.currentUser = C;
            for (var E in this._changes) {
                var G = this._changes[E];
                if (G.userid == C.id) {
                    G.username = C.name
                }
            }
            var B = this.getIceNodes(),
                D, A = this.attributes.userId;
            B.each((function (H, I) {
                D = I.getAttribute(A);
                if (D === null || D === C.id) {
                    I.setAttribute(this.attributes.userName, C.name)
                }
            }).bind(this))
        },
        setSessionId: function (A) {
            this._sessionId = A
        },
        toggleTooltips: function (A) {
            A = (undefined === A) ? !this.tooltips : Boolean(A);
            this.tooltips = A;
            this._updateTooltipsState()
        },
        visible: function (A) {
            if (A.nodeType === q.dom.TEXT_NODE) {
                A = A.parentNode
            }
            var B = A.getBoundingClientRect();
            return (B.top > 0 && B.left > 0)
        },
        _createIceNode: function (A, B, D) {
            var C = this.env.document.createElement(this.changeTypes[A].tag);
            C.setAttribute("class", this._getIceNodeClass(A));
            if (B) {
                C.appendChild(B)
            }
            this._addChange(A, [C], D);
            return C
        },
        insert: function (I) {
            this.hostMethods.beforeInsert && this.hostMethods.beforeInsert();
            var C = this.getCurrentRange(),
                D = this._isRangeInElement(C, this.element),
                B = D ? null : this.hostMethods.getHostRange(),
                H = this._startBatchChange(),
                G = Boolean(D && !D.collapsed),
                F = false;
            I = I || {};
            try {
                if (G) {
                    this._deleteContents(false, D);
                    D = this.getCurrentRange()
                }
                if (D || B) {
                    var A = I.nodes;
                    if (A && !e.isArray(A)) {
                        A = [A]
                    }
                    this._moveRangeToValidTrackingPos(D, B);
                    F = this._insertNodes(D, B, {
                        nodes: A,
                        text: I.text,
                        insertStubText: I.insertStubText !== false
                    })
                }
            } catch (E) {
                v(E, "while trying to insert nodes")
            } finally {
                this._endBatchChange(H, A || I.text || F)
            }
            return F
        },
        _deleteContents: function (D, B) {
            var A = true,
                G, C = this._browser;
            this.hostMethods.beforeDelete && this.hostMethods.beforeDelete();
            if (B) {
                this.selection.addRange(B)
            } else {
                B = this.getCurrentRange()
            }
            G = this._startBatchChange();
            try {
                if (B.collapsed === false) {
                    B = this._deleteSelection(B);
                    if (B && !this.visible(B.endContainer)) {
                        B.setEnd(B.endContainer, Math.max(0, B.endOffset - 1));
                        B.collapse(false)
                    }
                } else {
                    this._cleanupSelection(B, false, true);
                    if (this._isCurrentUserIceNode(this._getIceNode(B.startContainer, s))) {
                        return false
                    }
                    if (D) {
                        if (C.type === "mozilla") {
                            A = this._deleteRight(B);
                            if (!this.visible(B.endContainer)) {
                                if (B.endContainer.parentNode.nextSibling) {
                                    B.setEndBefore(B.endContainer.parentNode.nextSibling)
                                } else {
                                    B.setEndAfter(B.endContainer)
                                }
                                B.collapse(false)
                            }
                        } else {
                            if (B.endOffset === q.dom.getNodeCharacterLength(B.endContainer)) {
                                var E = B.startContainer.nextSibling;
                                if (e(E).is(this._deleteSelector)) {
                                    while (E) {
                                        if (e(E).is(this._deleteSelector)) {
                                            E = E.nextSibling;
                                            continue
                                        }
                                        B.setStart(E, 0);
                                        B.collapse(true);
                                        break
                                    }
                                }
                            }
                            A = this._deleteRight(B);
                            if (!this.visible(B.endContainer)) {
                                if (e(B.endContainer.parentNode).is(this._iceSelector)) {
                                    B.setStartAfter(B.endContainer.parentNode);
                                    B.collapse(true)
                                }
                            }
                        }
                    } else {
                        if (C.mozilla) {
                            A = this._deleteLeft(B);
                            if (!this.visible(B.startContainer)) {
                                if (B.startContainer.parentNode.previousSibling) {
                                    B.setEnd(B.startContainer.parentNode.previousSibling, 0)
                                } else {
                                    B.setEnd(B.startContainer.parentNode, 0)
                                }
                                B.moveEnd(q.dom.CHARACTER_UNIT, q.dom.getNodeCharacterLength(B.endContainer));
                                B.collapse(false)
                            }
                        } else {
                            if (!this.visible(B.startContainer)) {
                                if (B.endOffset === q.dom.getNodeCharacterLength(B.endContainer)) {
                                    var F = B.startContainer.previousSibling;
                                    if (e(F).is(this._deleteSelector)) {
                                        while (F) {
                                            if (e(F).is(this._deleteSelector)) {
                                                F = F.prevSibling;
                                                continue
                                            }
                                            B.setEndBefore(F.nextSibling, 0);
                                            B.collapse(false);
                                            break
                                        }
                                    }
                                }
                            }
                            A = this._deleteLeft(B)
                        }
                    }
                }
                B && this.selection.addRange(B)
            } finally {
                this._endBatchChange(G, A)
            }
            return A
        },
        getChanges: function (A) {
            var B = A ? this._filterChanges(A) : this._changes;
            return e.extend({}, B)
        },
        getChangeUserids: function () {
            var B = this,
                C = Object.keys(this._changes),
                A = C.map(function (D) {
                    return B._changes[C[D]].userid
                });
            return A.sort().filter(function (F, E, D) {
                if (E === D.indexOf(F)) {
                    return 1
                }
                return 0
            })
        },
        getElementContent: function () {
            return this.element.innerHTML
        },
        getCleanContent: function (A, D, B) {
            var C = this.getCleanDOM(A, {
                callback: D,
                prepare: B,
                clone: true
            });
            return (C && C.innerHTML) || ""
        },
        getCleanDOM: function (A, C) {
            var D = "",
                B = this;
            C = C || {};
            e.each(this.changeTypes, function (F, E) {
                if (F !== r) {
                    if (E > 0) {
                        D += ","
                    }
                    D += "." + B._getIceNodeClass(F)
                }
            });
            if (A) {
                if (typeof A === "string") {
                    A = e("<div>" + A + "</div>")[0]
                } else {
                    if (C.clone) {
                        A = e(A).clone()[0]
                    }
                }
            } else {
                A = C.clone ? e(this.element).clone()[0] : this.element
            }
            return this._cleanBody(A, D, C)
        },
        _cleanBody: function (A, E, B) {
            A = B.prepare ? B.prepare.call(this, A) : A;
            var D = e(A),
                C = D.find(E);
            e.each(C, function (F, G) {
                while (G.firstChild) {
                    G.parentNode.insertBefore(G.firstChild, G)
                }
                G.parentNode.removeChild(G)
            });
            D.find(this._deleteSelector).remove();
            A = B.callback ? B.callback.call(this, A) : A;
            return A
        },
        acceptAll: function (A) {
            if (A) {
                return this._acceptRejectSome(A, true)
            } else {
                this.getCleanDOM(this.element, {
                    clone: false
                });
                this._changes = {};
                this._triggerChange({
                    isText: true
                })
            }
        },
        rejectAll: function (D) {
            if (D) {
                return this._acceptRejectSome(D, false)
            } else {
                var F = this._insertSelector,
                    A = this._deleteSelector,
                    E, C = this,
                    B = e(this.element);
                B.find(F).each(function (G, H) {
                    C._removeNode(H)
                });
                B.find(A).each(function (G, H) {
                    E = q.dom.contents(H);
                    q.dom.replaceWith(H, E);
                    e.each(E, function (I, K) {
                        var J = K && K.parentNode;
                        C._normalizeNode(J)
                    })
                });
                this._changes = {};
                this._triggerChange({
                    isText: true
                })
            }
        },
        acceptChange: function (A) {
            this.acceptRejectChange(A, {
                isAccept: true
            })
        },
        rejectChange: function (A) {
            this.acceptRejectChange(A, {
                isAccept: false
            })
        },
        acceptRejectChange: function (O, D) {
            D = D || {};
            var L, U, S, P, M, Y, W, T = q.dom,
                X, F = D.removeChange !== false,
                J = this,
                G, R, Q, K = e(this.element),
                A = this._userStyles,
                C, B = this.attributes.userId,
                V = this._getIceNodeClass(r),
                E = this._getIceNodeClass(s),
                N = D.isAccept,
                H = (D.notify !== false);
            if (!O) {
                var I = this.getCurrentRange();
                if (!I || !I.collapsed) {
                    return
                }
                O = I.startContainer
            }
            L = P = "." + V;
            U = M = "." + E;
            if (!N) {
                P = U;
                M = L
            }
            S = L + "," + U;
            Y = T.getNode(O, S);
            G = Y.getAttribute(this.attributes.changeId);
            W = K.find(P + "[" + this.attributes.changeId + "=" + G + "]");
            X = W.length;
            W.each(function (aa, Z) {
                J._removeNode(Z)
            });
            W = K.find(M + "[" + this.attributes.changeId + "=" + G + "]");
            X += W.length;
            e.each(W, function (Z, aa) {
                if (p(aa)) {
                    return f(aa)
                }
                C = aa.getAttribute(B);
                Q = C !== null ? A[C] || "" : "";
                R = q.dom.contents(aa);
                e(aa).removeClass(E + " " + V + " " + Q);
                T.replaceWith(aa, R);
                e.each(R, function (ac, af) {
                    var ab = q.dom.TEXT_NODE == af.nodeType && af.nodeValue;
                    if (ab) {
                        var ae = false;
                        while (ab.indexOf("  ") >= 0) {
                            ae = true;
                            ab = ab.replace("  ", " \u00a0")
                        }
                        if (ae) {
                            af.nodeValue = ab
                        }
                    }
                    var ad = af && af.parentNode;
                    J._normalizeNode(ad)
                })
            });
            if (F) {
                delete this._changes[G]
            }
            if (X > 0 && H) {
                this._triggerChange({
                    isText: true
                })
            }
        },
        isInsideChange: function (C, B, A) {
            try {
                return Boolean(this.currentChangeNode(C, B, A))
            } catch (D) {
                v(D, "While testing if isInsideChange");
                return false
            }
        },
        getIceNodes: function () {
            var B = [];
            var A = this;
            e.each(this.changeTypes, function (C) {
                B.push("." + A._getIceNodeClass(C))
            });
            B = B.join(",");
            return e(this.element).find(B)
        },
        _getIceNode: function (C, B) {
            var A = this.changeTypes[B].tag + "." + this._getIceNodeClass(B);
            return q.dom.getNode((C && C.$) || C, A)
        },
        _isNodeOfChangeType: function (C, B) {
            if (!C) {
                return false
            }
            var A = "." + this._getIceNodeClass(B);
            return e(C.$ || C).is(A)
        },
        _isInsertNode: function (A) {
            return this._isNodeOfChangeType(A, s)
        },
        _isDeleteNode: function (A) {
            return this._isNodeOfChangeType(A, r)
        },
        _normalizeNode: function (A) {
            return q.dom.normalizeNode(A, this._browser.msie)
        },
        _moveRangeToValidTrackingPos: function (H, D) {
            if (!(H = (D || H))) {
                return
            }
            var A, B, F = -1,
                C, J = [],
                K, G, E = D ? this.hostMethods.getHostNode : g,
                L = false;
            while (!L) {
                B = H.startContainer;
                if (!B || J.indexOf(B) >= 0) {
                    return
                }
                C = E(B);
                J.push(B);
                A = this._getVoidElement({
                    node: C,
                    checkEmpty: false
                });
                if (A) {
                    if ((A !== B) && (J.indexOf(A) >= 0)) {
                        return
                    }
                    J.push(A)
                } else {
                    L = q.dom.isTextContainer(C)
                }
                if (!L) {
                    if (-1 == F) {
                        F = !u(E(H.startContainer), H.startOffset)
                    }
                    K = F ? q.dom.findPrevTextContainer(A || C, this.element) : q.dom.findNextTextContainer(A || C, this.element);
                    G = K.node;
                    if (D) {
                        G = this.hostMethods.makeHostElement(G)
                    }
                    try {
                        if (F) {
                            H.setStart(G, K.offset)
                        } else {
                            H.setEnd(G, K.offset)
                        }
                        H.collapse(F)
                    } catch (I) {
                        v(I, "While trying to move range to valid tracking position");
                        break
                    }
                }
            }
        },
        _isRangeInElement: function (A, B) {
            var C = A && A.startContainer;
            while (C) {
                if (C == B) {
                    return A
                }
                C = C.parentNode
            }
            return null
        },
        _getVoidElement: function (B) {
            if (!B) {
                return null
            }
            var D = B.node,
                C = B.checkEmpty !== false;
            try {
                var A = this._getIceNode(D, r);
                if (!A) {
                    if (3 == D.nodeType && (C && D.nodeValue == "\u200B")) {
                        return D
                    }
                }
                return A
            } catch (E) {
                v(E, "While trying to get void element of", D);
                return null
            }
        },
        _cleanupSelection: function (B, A, D) {
            var E;
            if (!B || !B.collapsed || !(E = B.startContainer)) {
                return
            }
            if (A) {
                E = this.hostMethods.getHostNode(E)
            }
            var C = E.nodeType;
            if (q.dom.TEXT_NODE == C) {
                return this._cleanupTextSelection(B, E, A, D)
            } else {
                return this._cleanupElementSelection(B, A)
            }
        },
        _cleanupTextSelection: function (B, G, A, F) {
            this._cleanupAroundNode(G);
            if (F && q.dom.isEmptyTextNode(G)) {
                var C = G.parentNode,
                    E = q.dom.getNodeIndex(G),
                    D = A ? this.hostMethods.makeHostElement : g;
                C.removeChild(G);
                E = Math.max(0, E);
                B.setStart(D(C), E);
                B.setEnd(D(C), E)
            }
        },
        _cleanupElementSelection: function (E, C) {
            var A, G = false,
                I = C ? this.hostMethods.getHostNode(E.startContainer) : E.startContainer,
                D = I.childNodes.length;
            if (D < 1) {
                return
            }
            try {
                if (E.startOffset > 0) {
                    A = I.childNodes[E.startOffset - 1]
                } else {
                    A = I.firstChild;
                    G = true
                }
                if (!A) {
                    return
                }
            } catch (H) {
                return
            }
            this._cleanupAroundNode(A, G);
            if (E.startOffset === 0) {
                return
            }
            var B = q.dom.getNodeIndex(A) + 1;
            if (q.dom.isEmptyTextNode(A)) {
                B = Math.max(0, B - 1);
                I.removeChild(A)
            }
            if (I.childNodes.length !== D) {
                var F = C ? this.hostMethods.makeHostElement : g;
                E.setStart(F(I), B);
                E.setEnd(F(I), B)
            }
        },
        _cleanupAroundNode: function (D, E) {
            var C = D.parentNode,
                A = D.nextSibling,
                F, B;
            while (A) {
                F = (e(A).is(this._iceSelector) && q.dom.hasNoTextOrStubContent(A)) || q.dom.isEmptyTextNode(A);
                if (F) {
                    B = A;
                    A = A.nextSibling;
                    C.removeChild(B)
                } else {
                    A = A.nextSibling
                }
            }
            A = D.previousSibling;
            while (A) {
                F = (e(A).is(this._iceSelector) && q.dom.hasNoTextOrStubContent(A)) || q.dom.isEmptyTextNode(A);
                if (F) {
                    B = A;
                    A = A.previousSibling;
                    C.removeChild(B)
                } else {
                    A = A.previousSibling
                }
            }
            if (E && q.dom.isEmptyTextNode(D)) {
                C.removeChild(D)
            }
        },
        _isCurrentUserIceNode: function (B) {
            var A = Boolean(B && e(B).attr(this.attributes.userId) === String(this.currentUser.id));
            if (A && this._sessionId) {
                A = B.getAttribute(this.attributes.sessionId) === String(this._sessionId)
            }
            return A
        },
        _getChangeTypeFromAlias: function (B) {
            var C, A = null;
            for (C in this.changeTypes) {
                if (this.changeTypes.hasOwnProperty(C)) {
                    if (this.changeTypes[C].alias == B) {
                        A = C
                    }
                }
            }
            return A
        },
        _getIceNodeClass: function (A) {
            return this.attrValuePrefix + this.changeTypes[A].alias
        },
        _getUserStyle: function (A) {
            if (A === null || A === "" || "undefined" == typeof A) {
                return this.stylePrefix
            }
            var B = null;
            if (this._userStyles[A]) {
                B = this._userStyles[A]
            } else {
                B = this._setUserStyle(A, this._getNewStyleId())
            }
            return B
        },
        _setUserStyle: function (A, C) {
            var B = this.stylePrefix + "-" + C;
            if (!this._styles[C]) {
                this._styles[C] = true
            }
            return this._userStyles[A] = B
        },
        _getNewStyleId: function () {
            var A = ++this._uniqueStyleIndex;
            if (this._styles[A]) {
                return this._getNewStyleId()
            } else {
                this._styles[A] = true;
                return A
            }
        },
        _addChange: function (D, F, C) {
            var E = C || this._batchChangeId || this.getNewChangeId(),
                A = this;
            if (!this._changes[E]) {
                var B = (new Date()).getTime();
                this._changes[E] = {
                    type: D,
                    time: B,
                    lastTime: B,
                    sessionId: this._sessionId,
                    userid: String(this.currentUser.id),
                    username: this.currentUser.name,
                    data: this._changeData || ""
                };
                this._triggerChange({
                    text: false
                })
            }
            e.each(F, function (G) {
                A._addNodeToChange(E, F[G])
            });
            return E
        },
        _addNodeToChange: function (E, D) {
            var F = this.getChange(E),
                B = {};
            if (!D.getAttribute(this.attributes.changeId)) {
                B[this.attributes.changeId] = E
            }
            var C = D.getAttribute(this.attributes.userId);
            if (!C) {
                C = F.userid;
                B[this.attributes.userId] = C
            }
            if (C == F.userid) {
                B[this.attributes.userName] = F.username
            }
            var A = D.getAttribute(this.attributes.changeData);
            if (null === A) {
                B[this.attributes.changeData] = this._changeData || ""
            }
            if (!D.getAttribute(this.attributes.time)) {
                B[this.attributes.time] = F.time
            }
            if (!D.getAttribute(this.attributes.lastTime)) {
                B[this.attributes.lastTime] = F.lastTime
            }
            if (F.sessionId && !D.getAttribute(this.attributes.sessionId)) {
                B[this.attributes.sessionId] = F.sessionId
            }
            if (!F.style) {
                F.style = this._getUserStyle(F.userid)
            }
            e(D).attr(B).addClass(F.style);
            this._updateNodeTooltip(D)
        },
        getChange: function (A) {
            return this._changes[A] || null
        },
        getNewChangeId: function () {
            var A = ++this._uniqueIDIndex;
            if (this._changes[A]) {
                A = this.getNewChangeId()
            }
            return A
        },
        _startBatchChange: function () {
            return this._batchChangeId ? null : (this._batchChangeId = this.getNewChangeId())
        },
        getContentElement: function () {
            return this.element
        },
        _endBatchChange: function (B, A) {
            if (B && (B === this._batchChangeId)) {
                this._batchChangeId = null;
                if (A) {
                    this._triggerChange({
                        isText: true
                    })
                }
            }
        },
        getCurrentRange: function () {
            try {
                return this.selection.getRangeAt(0)
            } catch (A) {
                v(A, "While trying to get current range");
                return null
            }
        },
        _insertNodes: function (B, O, P) {
            var M = O || B,
                Y = P || {},
                U = M.startContainer,
                G = (U && U.$) || U,
                V = O ? this.hostMethods.makeHostElement : g,
                Q = Y.nodes,
                X = Y.insertStubText !== false,
                L = Y.text,
                S, T, Z = this.env.document,
                E = false;
            var N = this._getIceNode(G, s),
                D = this._isCurrentUserIceNode(N);
            this._cleanupSelection(M, Boolean(O), true);
            if (D) {
                var H = Q && Q[0],
                    J = N.getAttribute(this.attributes.changeId);
                if (H) {
                    E = true;
                    M.insertNode(V(H));
                    var K = H.parentNode,
                        W = H.nextSibling;
                    T = Q.length;
                    for (S = 1; S < T; ++S) {
                        if (W) {
                            K.insertBefore(Q[S], W)
                        } else {
                            K.appendChild(Q[S])
                        }
                    }
                    var I = Q[T - 1];
                    if (q.dom.TEXT_NODE == I.nodeType) {
                        M.setEnd(I, (I.nodeValue && I.nodeValue.length) || 0)
                    } else {
                        M.setEndAfter(I)
                    }
                    M.collapse();
                    if (O) {
                        this.hostMethods.setHostRange(O)
                    } else {
                        this.selection.addRange(M)
                    }
                } else {
                    x(null, M, Z, true)
                }
                this._updateChangeTime(J)
            } else {
                var R = this._createIceNode(s);
                if (N) {
                    var A = N.childNodes.length;
                    this._normalizeNode(N);
                    if (A !== N.childNodes.length) {
                        if (O) {
                            O = M = this.hostMethods.getHostRange()
                        } else {
                            M.refresh()
                        }
                    }
                    if (N) {
                        var F = (O && this.hostMethods.getHostNode(O.endContainer)) || M.endContainer;
                        if ((F.nodeType == 3 && M.endOffset < M.endContainer.length) || (F !== N.lastChild)) {
                            N = this._splitNode(N, M.endContainer, M.endOffset)
                        }
                    }
                }
                if (N) {
                    M.setStartAfter(V(N));
                    M.collapse(true)
                }
                M.insertNode(V(R));
                T = (Q && Q.length) || 0;
                if (T) {
                    E = true;
                    for (S = 0; S < T; ++S) {
                        R.appendChild(Q[S])
                    }
                    M.setEndAfter(V(R.lastChild));
                    M.collapse()
                } else {
                    if (L) {
                        E = true;
                        var C = Z.createTextNode(L);
                        R.appendChild(C);
                        M.setEnd(C, 1);
                        M.collapse()
                    } else {
                        x(R, M, Z, X)
                    }
                }
                if (O) {
                    this.hostMethods.setHostRange(O)
                } else {
                    this.selection.addRange(M)
                }
            }
            return E
        },
        _updateChangeTime: function (E) {
            var D = this._changes[E];
            if (D) {
                var C = (new Date()).getTime(),
                    B = e(this.element).find("[" + this.attributes.changeId + "=" + E + "]"),
                    A = this.attributes.lastTime;
                D.lastTime = C;
                B.each(function (F, G) {
                    G.setAttribute(A, C)
                })
            }
        },
        _handleVoidEl: function (B, A) {
            var C = B && this._getVoidElement({
                node: B
            });
            if (C && !this._getIceNode(C, r)) {
                A.collapse(true);
                return true
            }
            return false
        },
        _deleteSelection: function (H) {
            var I = new q.Bookmark(this.env, H),
                A = q.dom.getElementsBetween(I.start, I.end),
                K = [],
                J = [],
                L = {
                    deleteNodesCollection: J,
                    moveLeft: true,
                    range: null
                };
            for (var G = 0; G < A.length; G++) {
                var D = A[G];
                if (!D || !D.parentNode) {
                    continue
                }
                if (q.dom.isBlockElement(D)) {
                    K.push(D);
                    if (!q.dom.canContainTextElement(D)) {
                        for (var E = 0; E < D.childNodes.length; E++) {
                            A.push(D.childNodes[E])
                        }
                        continue
                    }
                }
                if (q.dom.isEmptyTextNode(D)) {
                    this._removeNode(D);
                    continue
                }
                if (!this._getVoidElement({
                        node: D
                    })) {
                    if (D.nodeType !== q.dom.TEXT_NODE) {
                        if (y(D)) {
                            this._addDeleteTrackingToBreak(D, L);
                            continue
                        }
                        if (q.dom.isStubElement(D)) {
                            this._addDeleteTracking(D, L);
                            continue
                        }
                        if (q.dom.hasNoTextOrStubContent(D)) {
                            this._removeNode(D);
                            continue
                        }
                        for (var F = 0; F < D.childNodes.length; F++) {
                            var C = D.childNodes[F];
                            A.push(C)
                        }
                        continue
                    }
                    var B = q.dom.getBlockParent(D);
                    this._addDeleteTracking(D, L);
                    if (q.dom.hasNoTextOrStubContent(B)) {
                        q.dom.remove(B)
                    }
                }
            }
            if (J.length) {
                I.remove();
                this._cleanupAroundNode(J[0]);
                H.setStartBefore(J[0]);
                H.collapse(true);
                this.selection.addRange(H)
            } else {
                I.selectStartAndCollapse();
                if (H = this.getCurrentRange()) {
                    this._cleanupSelection(H, false, false);
                    H = this.getCurrentRange()
                }
            }
            return H
        },
        _deleteRight: function (K) {
            var B = q.dom.isBlockElement(K.startContainer) && K.startContainer || q.dom.getBlockParent(K.startContainer, this.element) || null,
                M = B ? (q.dom.hasNoTextOrStubContent(B)) : false,
                I = B && q.dom.getNextContentNode(B, this.element),
                N = I ? (q.dom.hasNoTextOrStubContent(I)) : false,
                F = K.endContainer,
                E = K.endOffset,
                O, C = K.commonAncestorContainer,
                G, R = false;
            if (M) {
                return false
            }
            if (y(C)) {
                this._addDeleteTrackingToBreak(C, {
                    range: K
                });
                return true
            }
            if (C.nodeType !== q.dom.TEXT_NODE) {
                if (E === 0 && q.dom.isBlockElement(C) && (!q.dom.canContainTextElement(C))) {
                    var Q = C.firstElementChild;
                    if (Q) {
                        K.setStart(Q, 0);
                        K.collapse();
                        return this._deleteRight(K)
                    }
                }
                if (C.childNodes.length > E) {
                    var L = C.childNodes[E];
                    if (y(L)) {
                        this._addDeleteTrackingToBreak(L, {
                            range: K
                        });
                        return true
                    }
                    K.setStart(C.childNodes[E], 0);
                    K.collapse(true);
                    R = this._deleteRight(K);
                    K.refresh();
                    return R
                } else {
                    G = q.dom.getNextContentNode(C, this.element);
                    if (G) {
                        if (y(G)) {
                            this._addDeleteTrackingToBreak(G, {
                                range: K
                            });
                            return true
                        }
                        K.setEnd(G, 0)
                    }
                    K.collapse();
                    return this._deleteRight(K)
                }
            }
            try {
                K.moveEnd(q.dom.CHARACTER_UNIT, 1);
                K.moveEnd(q.dom.CHARACTER_UNIT, -1)
            } catch (P) {}
            if (E === F.data.length && (!q.dom.hasNoTextOrStubContent(F))) {
                G = q.dom.getNextNode(F, this.element);
                if (!G) {
                    K.selectNodeContents(F);
                    K.collapse();
                    return false
                }
                if (y(G)) {
                    this._addDeleteTrackingToBreak(G, {
                        range: K
                    });
                    return true
                }
                if (G.nodeType === q.dom.TEXT_NODE) {
                    G = G.parentNode
                }
                if (!G.isContentEditable) {
                    R = this._addDeleteTracking(G, {
                        range: null,
                        moveLeft: false,
                        merge: true
                    });
                    var D = this.env.document.createTextNode("");
                    G.parentNode.insertBefore(D, G.nextSibling);
                    K.selectNode(D);
                    K.collapse(true);
                    return R
                }
                if (this._handleVoidEl(G, K)) {
                    return true
                }
                if (q.dom.isChildOf(G, B) && q.dom.isStubElement(G)) {
                    return this._addDeleteTracking(G, {
                        range: K,
                        moveLeft: false,
                        merge: true
                    })
                }
            }
            if (this._handleVoidEl(G, K)) {
                return true
            }
            if (q.dom.isOnBlockBoundary(K.startContainer, K.endContainer, this.element)) {
                if (this.mergeBlocks && e(q.dom.getBlockParent(G, this.element)).is(this.blockEl)) {
                    if (I !== q.dom.getBlockParent(K.endContainer, this.element)) {
                        K.setEnd(I, 0)
                    }
                    var J = q.dom.getElementsBetween(K.startContainer, K.endContainer);
                    for (O = 0; O < J.length; O++) {
                        q.dom.remove(J[O])
                    }
                    return q.dom.mergeBlockWithSibling(K, q.dom.getBlockParent(K.endContainer, this.element) || B)
                } else {
                    if (N) {
                        q.dom.remove(I);
                        K.collapse(true);
                        return true
                    }
                    K.setStart(I, 0);
                    K.collapse(true);
                    return true
                }
            }
            var A = K.endContainer,
                H = n(A, K.endOffset, 1);
            return this._addDeleteTracking(H, {
                range: K,
                moveLeft: false,
                merge: true
            })
        },
        _deleteLeft: function (I) {
            var E = q.dom.isBlockElement(I.startContainer) && I.startContainer || q.dom.getBlockParent(I.startContainer, this.element) || null,
                H = E ? q.dom.hasNoTextOrStubContent(E) : false,
                B = E && q.dom.getPrevContentNode(E, this.element),
                D = B ? q.dom.hasNoTextOrStubContent(B) : false,
                N = I.startContainer,
                C = I.startOffset,
                Q = I.commonAncestorContainer,
                P, M;
            if (H) {
                return false
            }
            if (y(Q)) {
                this._addDeleteTrackingToBreak(Q, {
                    range: I,
                    moveLeft: true
                });
                return true
            }
            if (C === 0 || Q.nodeType !== q.dom.TEXT_NODE) {
                if (q.dom.isBlockElement(Q) && (!q.dom.canContainTextElement(Q))) {
                    if (C === 0) {
                        var L = Q.firstElementChild;
                        if (L) {
                            I.setStart(L, 0);
                            I.collapse();
                            return this._deleteLeft(I)
                        }
                    } else {
                        var O = Q.lastElementChild;
                        if (O) {
                            P = I.getLastSelectableChild(O);
                            if (P) {
                                I.setStart(P, P.data.length);
                                I.collapse();
                                return this._deleteLeft(I)
                            }
                        }
                    }
                }
                if (C === 0) {
                    M = q.dom.getPrevContentNode(N, this.element)
                } else {
                    M = Q.childNodes[C - 1]
                }
                if (!M) {
                    return false
                }
                if (e(M).is(this._iceSelector) && M.childNodes.length > 0 && M.lastChild) {
                    M = M.lastChild
                }
                if (y(M)) {
                    this._addDeleteTrackingToBreak(M, {
                        range: I,
                        moveLeft: true
                    });
                    return true
                }
                if (M.nodeType === q.dom.TEXT_NODE) {
                    M = M.parentNode
                }
                if (!M.isContentEditable) {
                    var A = this._addDeleteTracking(M, {
                        range: null,
                        moveLeft: true,
                        merge: true
                    });
                    var F = document.createTextNode("");
                    M.parentNode.insertBefore(F, M);
                    I.selectNode(F);
                    I.collapse(true);
                    return A
                }
                if (this._handleVoidEl(M, I)) {
                    return true
                }
                if (q.dom.isStubElement(M) && q.dom.isChildOf(M, E) || !M.isContentEditable) {
                    this._addDeleteTracking(M, {
                        range: I,
                        moveLeft: true,
                        merge: true
                    });
                    return true
                }
                if (q.dom.isStubElement(M)) {
                    q.dom.remove(M);
                    I.collapse(true);
                    return false
                }
                if (M !== E && !q.dom.isChildOf(M, E)) {
                    if (!q.dom.canContainTextElement(M)) {
                        M = M.lastElementChild
                    }
                    if (M.lastChild && M.lastChild.nodeType !== q.dom.TEXT_NODE && q.dom.isStubElement(M.lastChild) && M.lastChild.tagName !== "BR") {
                        I.setStartAfter(M.lastChild);
                        I.collapse(true);
                        return true
                    }
                    P = I.getLastSelectableChild(M);
                    if (P && !q.dom.isOnBlockBoundary(I.startContainer, P, this.element)) {
                        I.selectNodeContents(P);
                        I.collapse();
                        return true
                    }
                }
            }
            if (C === 1 && !q.dom.isBlockElement(Q) && I.startContainer.childNodes.length > 1 && I.startContainer.childNodes[0].nodeType === q.dom.TEXT_NODE && I.startContainer.childNodes[0].data.length === 0) {
                I.setStart(I.startContainer, 0);
                return this._deleteLeft(I)
            }
            try {
                I.moveStart(q.dom.CHARACTER_UNIT, -1);
                I.moveStart(q.dom.CHARACTER_UNIT, 1)
            } catch (K) {}
            if (q.dom.isOnBlockBoundary(I.startContainer, I.endContainer, this.element)) {
                if (D) {
                    q.dom.remove(B);
                    I.collapse();
                    return true
                }
                if (B && B.lastChild && q.dom.isStubElement(B.lastChild)) {
                    I.setStartAfter(B.lastChild);
                    I.collapse(true);
                    return true
                }
                P = I.getLastSelectableChild(B);
                if (P) {
                    I.setStart(P, P.data.length);
                    I.collapse(true)
                } else {
                    if (B) {
                        I.setStart(B, B.childNodes.length);
                        I.collapse(true)
                    }
                }
                return true
            }
            var G = I.startContainer;
            if (G && (G.nodeType === q.dom.TEXT_NODE)) {
                var J = n(G, I.startOffset - 1, 1);
                this._addDeleteTracking(J, {
                    range: I,
                    moveLeft: true,
                    merge: true
                });
                return true
            }
            return false
        },
        _removeNode: function (B) {
            var A = B && B.parentNode;
            if (A) {
                A.removeChild(B);
                if (A !== this.element && q.dom.hasNoTextOrStubContent(A)) {
                    this._removeNode(A)
                }
            }
        },
        _addDeleteTracking: function (D, J) {
            var F = J && J.moveLeft,
                G = this._getIceNode(D, s),
                H, E;
            J = J || {};
            if (G) {
                return this._addDeletionInInsertNode(D, G, J)
            }
            E = J.range;
            if (E && this._getIceNode(D, r)) {
                return this._deleteInDeleted(D, J)
            }
            if (D.previousSibling && q.dom.isEmptyTextNode(D.previousSibling)) {
                D.parentNode.removeChild(D.previousSibling)
            }
            if (D.nextSibling && q.dom.isEmptyTextNode(D.nextSibling)) {
                D.parentNode.removeChild(D.nextSibling)
            }
            var B = this._getIceNode(D.previousSibling, r),
                I = this._getIceNode(D.nextSibling, r);
            if (B && this._isCurrentUserIceNode(B)) {
                H = B;
                H.appendChild(D);
                if (I && this._isCurrentUserIceNode(I)) {
                    var C = q.dom.extractContent(I);
                    H.appendChild(C);
                    I.parentNode.removeChild(I)
                }
            } else {
                if (I && this._isCurrentUserIceNode(I)) {
                    H = I;
                    H.insertBefore(D, H.firstChild)
                } else {
                    var A = this.getAdjacentChangeId(D, F);
                    H = this._createIceNode(r, null, A);
                    if (J.deleteNodesCollection) {
                        J.deleteNodesCollection.push(H)
                    }
                    D.parentNode.insertBefore(H, D);
                    H.appendChild(D)
                }
            }
            if (E) {
                if (q.dom.isStubElement(D)) {
                    E.selectNode(D)
                } else {
                    E.selectNodeContents(D)
                }
                if (F) {
                    E.collapse(true)
                } else {
                    E.collapse()
                }
            }
            if (H) {
                this._normalizeNode(H);
                E && E.refresh()
            }
            return true
        },
        _addDeleteTrackingToBreak: function (E, B) {
            var D = Boolean(B && B.moveLeft);

            function A() {
                var G = B && B.range;
                if (G) {
                    if (y(E) || q.dom.hasNoTextOrStubContent(E) || D) {
                        if (D) {
                            G.setStartBefore(E);
                            G.setEndBefore(E)
                        } else {
                            G.setStartAfter(E);
                            G.setEndAfter(E)
                        }
                    } else {
                        if (E.firstChild) {
                            G.setStartBefore(E.firstChild);
                            G.setEndBefore(E.firstChild)
                        }
                    }
                    G.collapse()
                }
            }
            if (!y(E)) {
                v("addDeleteTracking to BR: not a break element");
                return
            }
            if (this._isDeleteNode(E)) {
                return A()
            }
            f(E);
            var C = r;
            q.dom.addClass(E, this._getIceNodeClass(C));
            var F = this.getAdjacentChangeId(E, D);
            this._addChange(C, [E], F);
            A()
        },
        _deleteInDeleted: function (C, I) {
            var D = I.range,
                E = I.moveLeft,
                G;
            this._normalizeNode(C);
            var H = false;
            if (E) {
                var A = q.dom.getPrevContentNode(C, this.element);
                while (!H) {
                    G = this._getIceNode(A, r);
                    if (!G) {
                        H = true
                    } else {
                        A = q.dom.getPrevContentNode(A, this.element)
                    }
                }
                if (A) {
                    var F = D.getLastSelectableChild(A);
                    if (F) {
                        A = F
                    }
                    D.setStart(A, q.dom.getNodeCharacterLength(A));
                    D.collapse(true)
                }
            } else {
                var B = q.dom.getNextContentNode(C, this.element);
                while (!H) {
                    G = this._getIceNode(B, r);
                    if (!G) {
                        H = true
                    } else {
                        B = q.dom.getNextContentNode(B, this.element)
                    }
                }
                if (B) {
                    D.selectNodeContents(B);
                    D.collapse(true)
                }
            }
            return true
        },
        _addDeletionInInsertNode: function (D, H, M) {
            var E = M && M.range,
                F = M && M.moveLeft;
            M = M || {};
            if (this._isCurrentUserIceNode(H)) {
                if (E) {
                    if (F) {
                        E.setStartBefore(D)
                    } else {
                        E.setStartAfter(D)
                    }
                    E.collapse(F)
                }
                D.parentNode.removeChild(D);
                if (!this._browser.msie) {
                    this._normalizeNode(H)
                }
                var G = e(H),
                    K = G.find(".iceBookmark").length,
                    B;
                if (K > 0) {
                    B = G.clone();
                    B.find(".iceBookmark").remove();
                    B = B[0]
                } else {
                    B = H
                }
                if (q.dom.hasNoTextOrStubContent(B)) {
                    if (E) {
                        E.setStartBefore(H);
                        E.collapse(true)
                    }
                    q.dom.replaceWith(H, q.dom.contents(H))
                }
            } else {
                var C = c.dom.getNodeIndex(D),
                    J = D.parentNode,
                    I = J.childNodes.length,
                    L;
                J.removeChild(D);
                L = this._createIceNode(r);
                if (M.deleteNodesCollection) {
                    M.deleteNodesCollection.push(L)
                }
                L.appendChild(D);
                if (C > 0 && C >= (I - 1)) {
                    q.dom.insertAfter(H, L)
                } else {
                    if (C > 0) {
                        var A = this._splitNode(H, J, C);
                        this._deleteEmptyNode(A)
                    }
                    H.parentNode.insertBefore(L, H)
                }
                this._deleteEmptyNode(H);
                if (E && F) {
                    E.setStartBefore(L);
                    E.collapse(true);
                    this.selection.addRange(E)
                }
                if (M && M.merge) {
                    this._mergeDeleteNode(L)
                }
                if (E) {
                    E.refresh()
                }
            }
            return true
        },
        _deleteEmptyNode: function (B) {
            var A = B && B.parentNode;
            if (A && q.dom.hasNoTextOrStubContent(B)) {
                A.removeChild(B)
            }
        },
        _mergeDeleteNode: function (C) {
            var B, A;
            if (this._isCurrentUserIceNode(B = this._getIceNode(C.previousSibling, r))) {
                A = q.dom.extractContent(C);
                C.parentNode.removeChild(C);
                B.appendChild(A);
                this._mergeDeleteNode(B)
            } else {
                if (this._isCurrentUserIceNode(B = this._getIceNode(C.nextSibling, r))) {
                    A = q.dom.extractContent(B);
                    C.parentNode.removeChild(B);
                    C.appendChild(A);
                    this._mergeDeleteNode(C)
                }
            }
        },
        handleEvent: function (B) {
            if (!this._isTracking) {
                return true
            }
            var A = false;
            if ("keypress" == B.type) {
                A = this.keyPress(B)
            } else {
                if ("keydown" == B.type) {
                    A = !this.handleKeyDown(B)
                }
            }
            if (A) {
                B.stopImmediatePropagation();
                B.preventDefault()
            }
            return !A
        },
        _handleAncillaryKey: function (E) {
            var D = this._browser,
                C = false,
                B = this,
                A = B.getCurrentRange();
            switch (E) {
                case q.dom.DOM_VK_DELETE:
                    C = this._deleteContents();
                    break;
                case 46:
                    C = this._deleteContents(true);
                    break;
                case q.dom.DOM_VK_DOWN:
                case q.dom.DOM_VK_UP:
                case q.dom.DOM_VK_LEFT:
                    if (D.type === "mozilla") {
                        if (!this.visible(A.startContainer)) {
                            if (A.startContainer.parentNode.previousSibling) {
                                A.setEnd(A.startContainer.parentNode.previousSibling, 0);
                                A.moveEnd(q.dom.CHARACTER_UNIT, q.dom.getNodeCharacterLength(A.endContainer));
                                A.collapse(false)
                            } else {
                                A.setEnd(A.startContainer.parentNode.nextSibling, 0);
                                A.collapse(false)
                            }
                        }
                    }
                    C = false;
                    break;
                case q.dom.DOM_VK_RIGHT:
                    if (D.type === "mozilla") {
                        if (!this.visible(A.startContainer)) {
                            if (A.startContainer.parentNode.nextSibling) {
                                A.setStart(A.startContainer.parentNode.nextSibling, 0);
                                A.collapse(true)
                            }
                        }
                    }
                    break;
                default:
                    break
            }
            return C
        },
        handleKeyDown: function (A) {
            if (this._handleSpecialKey(A)) {
                return true
            }
            return !this.keyPress(A)
        },
        onKeyDown: function (A) {
            if (this._handleSpecialKey(A)) {
                return false
            }
            return this._handleAncillaryKey(A)
        },
        keyPress: function (D) {
            var F = null;
            if (D.ctrlKey || D.metaKey) {
                return false
            }
            var A = this.getCurrentRange(),
                E, C = A && q.dom.parents(A.startContainer, "br")[0] || null;
            if (C) {
                A.moveToNextEl(C)
            }
            var B = D.keyCode ? D.keyCode : D.which;
            switch (B) {
                case 32:
                    return this.insert({
                        text: " "
                    });
                case q.dom.DOM_VK_DELETE:
                case 46:
                case q.dom.DOM_VK_DOWN:
                case q.dom.DOM_VK_UP:
                case q.dom.DOM_VK_LEFT:
                case q.dom.DOM_VK_RIGHT:
                    return this._handleAncillaryKey(B);
                case q.dom.DOM_VK_ENTER:
                    this._handleEnter();
                    return false;
                default:
                    if (o(B)) {
                        return false
                    }
                    F = D["char"] || String.fromCharCode(B);
                    if (F) {
                        var E = this._browser.msie ? {
                            text: F
                        } : null;
                        return this.insert(E)
                    }
                    return false
            }
        },
        _handleEnter: function () {
            var A = this.getCurrentRange();
            if (A && !A.collapsed) {
                this._deleteContents()
            }
        },
        _handleSpecialKey: function (B) {
            var A = B.which;
            if (A === null) {
                A = B.keyCode
            }
            switch (A) {
                case 120:
                case 88:
                    if (true === B.ctrlKey || true === B.metaKey) {
                        this.prepareToCut();
                        return true
                    }
                    break;
                case 67:
                case 99:
                    if (true === B.ctrlKey || true === B.metaKey) {
                        this.prepareToCopy();
                        return true
                    }
                    break;
                default:
                    break
            }
            return false
        },
        currentChangeNode: function (C, A, B) {
            var D = this._iceSelector,
                G = null;
            if (!C) {
                G = this.getCurrentRange();
                if (!G) {
                    return false
                }
                if (B !== false && G.collapsed) {
                    this._cleanupSelection(G, false, false);
                    C = G.startContainer
                } else {
                    C = G.commonAncestorContainer
                }
            }
            var H = A ? e(C).is(D) && C : q.dom.getNode(C, D);
            if ((!H) && G && G.collapsed) {
                var F = G.endContainer,
                    I = G.endOffset,
                    E = null;
                if (F.nodeType === q.dom.TEXT_NODE) {
                    if (I === F.length) {
                        E = q.dom.getNextNode(F)
                    } else {
                        if (I === 0) {
                            E = q.dom.getPrevNode(F, this.element)
                        }
                    }
                } else {
                    if (F.nodeType === q.dom.ELEMENT_NODE) {
                        if (I === 0) {
                            E = q.dom.getPrevNode(F, this.element)
                        } else {
                            if (F.childNodes.length > I) {
                                F = F.childNodes[I - 1];
                                if (e(F).is(D)) {
                                    return F
                                }
                                E = q.dom.getNextNode(F)
                            }
                        }
                    }
                }
                if (E) {
                    H = e(E).is(D)
                }
            }
            return H
        },
        setShowChanges: function (A) {
            var B = e(this.element);
            A = Boolean(A);
            this._isVisible = A;
            B.toggleClass("ICE-Tracking", A);
            this._showTitles(A);
            this._updateTooltipsState()
        },
        reload: function () {
            this._loadFromDom()
        },
        hasChanges: function () {
            for (var A in this._changes) {
                var B = this._changes[A];
                if (B && B.type) {
                    return true
                }
            }
            return false
        },
        countChanges: function (A) {
            var B = this._filterChanges(A);
            return B.count
        },
        setChangeData: function (A) {
            if (null == A || (typeof A == "undefined")) {
                A = ""
            }
            this._changeData = String(A)
        },
        getDeleteClass: function () {
            return this._getIceNodeClass(r)
        },
        prepareToCopy: function () {
            var A = this.getCurrentRange();
            if (A && !A.collapsed) {
                this._removeTrackingInRange(A)
            }
        },
        prepareToCut: function () {
            var D = this.getCurrentRange(),
                A = this.hostMethods.getHostRange();
            if (D && A && D.collapsed && !A.collapsed) {
                try {
                    var C = this.hostMethods.getHostRangeData(A);
                    D.setStart(C.startContainer, C.startOffset);
                    D.setEnd(C.endContainer, C.endOffset)
                } catch (E) {
                    return
                }
            }
            if (!D || D.collapsed) {
                return false
            }
            l(D, this.element);
            var I = D.cloneContents(),
                B = D.cloneRange(),
                H = I.firstChild,
                F = I.lastChild;
            this.hostMethods.beforeEdit();
            D.collapse(false);
            D.insertNode(I);
            D.setStartBefore(H);
            D.setEndAfter(F);
            var G = this._startBatchChange();
            try {
                this._deleteSelection(D)
            } catch (E) {
                v(E, "While trying to delete selection")
            } finally {
                this._endBatchChange(G);
                this.selection.addRange(B);
                this._removeTrackingInRange(B, false)
            }
            return true
        },
        toString: function () {
            return "ICE " + ((this.element && this.element.id) || "(no element id)")
        },
        _splitNode: function (E, H, A) {
            var D = E.parentNode,
                B = c.dom.getNodeIndex(E),
                G = H.ownerDocument,
                C = G.createRange(),
                F;
            C.setStart(D, B);
            C.setEnd(H, A);
            F = C.extractContents();
            D.insertBefore(F, E);
            if (this.isInsideChange(E, true)) {
                this._updateNodeTooltip(E.previousSibling)
            }
            return E.previousSibling
        },
        _triggerChange: function (A) {
            if (this._isTracking) {
                this.$this.trigger("change");
                if (A && A.isText) {
                    this.$this.trigger("textChange")
                }
            }
        },
        _updateNodeTooltip: function (A) {
            if (this.tooltips && this._isVisible) {
                this._addTooltip(A)
            }
        },
        _acceptRejectSome: function (C, A) {
            var E = (function (G, H) {
                    this.acceptRejectChange(H, {
                        isAccept: A,
                        notify: false
                    })
                }).bind(this),
                F, B, D = this._filterChanges(C);
            for (F in D.changes) {
                B = e(this.element).find("[" + this.attributes.changeId + "=" + F + "]");
                B.each(E)
            }
            if (D.count) {
                this._triggerChange({
                    isText: true
                })
            }
        },
        _filterChanges: function (K) {
            var E = 0,
                H = {},
                G, L = K || {},
                C = L.filter,
                D = L.exclude ? e.map(L.exclude, function (M) {
                    return String(M)
                }) : null,
                B = L.include ? e.map(L.include, function (M) {
                    return String(M)
                }) : null,
                F = L.verify,
                A = null;
            for (var J in this._changes) {
                G = this._changes[J];
                if (G && G.type) {
                    var I = (C && !C({
                        userid: G.userid,
                        time: G.time,
                        data: G.data
                    })) || (D && D.indexOf(G.userid) >= 0) || (B && B.indexOf(G.userid) < 0);
                    if (!I) {
                        if (F) {
                            A = e(this.element).find("[" + this.attributes.changeId + "]");
                            I = !A.length
                        }
                        if (!I) {
                            ++E;
                            H[J] = G
                        }
                    }
                }
            }
            return {
                count: E,
                changes: H
            }
        },
        _loadFromDom: function () {
            this._changes = {};
            this._uniqueStyleIndex = 0;
            var F = this.currentUser && this.currentUser.id,
                G = (this.currentUser && this.currentUser.name) || "",
                C = (new Date()).getTime(),
                E, I = new RegExp(this.stylePrefix + "-(\\d+)"),
                A = [];
            for (var H in this.changeTypes) {
                A.push(this._getIceNodeClass(H))
            }
            var B = this.getIceNodes();
            var D = function (O, K) {
                var S = 0,
                    L, U = "",
                    O, J = K.className.split(" ");
                for (O = 0; O < J.length; O++) {
                    E = I.exec(J[O]);
                    if (E) {
                        L = E[0];
                        S = E[1]
                    }
                    var V = new RegExp("(" + A.join("|") + ")").exec(J[O]);
                    if (V) {
                        U = this._getChangeTypeFromAlias(V[1])
                    }
                }
                var P = K.getAttribute(this.attributes.userId);
                var T;
                if (F && (P == F)) {
                    T = G;
                    K.setAttribute(this.attributes.userName, G)
                } else {
                    T = K.getAttribute(this.attributes.userName)
                }
                this._setUserStyle(P, Number(S));
                var W = parseInt(K.getAttribute(this.attributes.changeId) || "");
                if (isNaN(W)) {
                    W = this.getNewChangeId();
                    K.setAttribute(this.attributes.changeId, W)
                }
                var M = parseInt(K.getAttribute(this.attributes.time) || "");
                if (isNaN(M)) {
                    M = C
                }
                var R = parseInt(K.getAttribute(this.attributes.lastTime) || "");
                if (isNaN(R)) {
                    R = M
                }
                var N = K.getAttribute(this.attributes.sessionId);
                var Q = K.getAttribute(this.attributes.changeData) || "";
                this._changes[W] = {
                    type: U,
                    style: L,
                    userid: String(P),
                    username: T,
                    time: M,
                    lastTime: R,
                    sessionId: N,
                    data: Q
                };
                this._updateNodeTooltip(K)
            }.bind(this);
            B.each(D);
            this._triggerChange()
        },
        _showTitles: function (B) {
            var A = this.getIceNodes();
            if (B) {
                e(A).each((function (C, D) {
                    this._updateNodeTooltip(D)
                }).bind(this))
            } else {
                e(A).removeAttr("title")
            }
        },
        _updateTooltipsState: function () {
            var B, A = this;
            if (this.tooltips && this._isVisible) {
                if (!this._showingTips) {
                    this._showingTips = true;
                    B = this.getIceNodes();
                    B.each(function (C, D) {
                        A._addTooltip(D)
                    })
                }
            } else {
                if (this._showingTips) {
                    this._showingTips = false;
                    B = this.getIceNodes();
                    B.each(function (C, D) {
                        e(D).unbind("mouseover").unbind("mouseout")
                    })
                }
            }
        },
        _addTooltip: function (A) {
            e(A).unbind("mouseover").unbind("mouseout").mouseover(this._tooltipMouseOver).mouseout(this._tooltipMouseOut)
        },
        _tooltipMouseOver: function (D) {
            var C = D.currentTarget,
                B = e(C),
                E, A = this;
            if (D.buttons || B.data("_tooltip_t")) {
                return
            }
            E = setTimeout(function () {
                var G = A.currentChangeNode(C),
                    I = G && G.getAttribute(A.attributes.changeId),
                    H = I && A.getChange(I);
                if (H) {
                    var F = q.dom.hasClass(G, A._getIceNodeClass(s)) ? "insert" : "delete";
                    B.removeData("_tooltip_t");
                    A.hostMethods.showTooltip(C, {
                        userName: H.username,
                        changeId: I,
                        userId: H.userid,
                        time: H.time,
                        lastTime: H.lastTime,
                        type: F
                    })
                }
            }, this.tooltipsDelay);
            B.data("_tooltip_t", E)
        },
        _tooltipMouseOut: function (C) {
            var B = C.currentTarget,
                A = e(B),
                D = A.data("_tooltip_t");
            A.removeData("_tooltip_t");
            if (D) {
                clearTimeout(D)
            } else {
                this.hostMethods.hideTooltip(B)
            }
        },
        _removeTrackingInRangeOld: function (C) {
            var G = this._getIceNodeClass(s),
                B = this._getIceNodeClass(r),
                A = "." + G + ",." + B,
                D = "data-ice-class",
                F = function (L) {
                    var K, J = null;
                    if (L.nodeType == q.dom.TEXT_NODE) {
                        J = e(L).parents(A)
                    } else {
                        var I = e(L);
                        if (I.is(A)) {
                            J = I
                        } else {
                            J = I.parents(A)
                        }
                    }
                    K = (J && J[0]);
                    if (K) {
                        var H = K.className;
                        K.setAttribute(D, H);
                        K.setAttribute("class", "ice-no-decoration");
                        return true
                    }
                    return false
                };
            C.getNodes(null, F);
            var E = this.element;
            setTimeout(function () {
                var H = e(E).find("[" + D + "]");
                H.each(function (J, K) {
                    var I = K.getAttribute(D);
                    if (I) {
                        K.setAttribute("class", I);
                        K.removeAttribute(D)
                    }
                })
            }, 10)
        },
        _removeTrackingInRange: function (G) {
            var E = this._getIceNodeClass(s),
                A = this._getIceNodeClass(r),
                F = "." + E + ",." + A,
                H = this._savedNodesMap,
                I = "data-ice-class",
                B = Date.now() % 1000000,
                C = function (P) {
                    var M, O, L = null;
                    if (P.nodeType == q.dom.TEXT_NODE) {
                        L = e(P).parents(F)
                    } else {
                        M = e(P);
                        if (M.is(F)) {
                            L = M
                        } else {
                            L = M.parents(F)
                        }
                    }
                    if (O = (L && L[0])) {
                        var N = z(O),
                            J = O.className,
                            K = String(B++);
                        H[K] = {
                            attributes: N,
                            className: J
                        };
                        k(O);
                        O.setAttribute(I, K);
                        O.setAttribute("class", "ice-no-decoration");
                        return true
                    }
                    return false
                };
            G.getNodes(null, C);
            var D = this.element;
            setTimeout(function () {
                var J = e(D).find("[" + I + "]");
                J.each(function (M, N) {
                    var K = N.getAttribute(I),
                        L = H[K];
                    if (K) {
                        delete H[K];
                        Object.keys(L.attributes).forEach(function (O) {
                            N.setAttribute(O, L.attributes[O])
                        });
                        N.setAttribute("class", L.className);
                        N.removeAttribute(I)
                    } else {
                        v("missing save data for node")
                    }
                })
            }, 10)
        },
        _onDomMutation: function (D) {
            var E, C = D.length,
                B, G, A, F;
            for (E = 0; E < C; ++E) {
                B = D[E];
                switch (B.type) {
                    case "childList":
                        A = B.addedNodes;
                        for (G = A.length - 1; G >= 0; --G) {
                            F = A[G];
                            t.log("mutation: added node", F.tagName)
                        }
                        break
                }
            }
        },
        _setDomObserverTimeout: function () {
            var A = this;
            if (this._domObserverTimeout) {
                window.clearTimeout(this._domObserverTimeout)
            }
            this._domObserverTimeout = window.setTimeout(function () {
                A._domObserverTimeout = null;
                A._domObserver.disconnect()
            }, 1)
        },
        getAdjacentChangeId: function (C, D) {
            var B = D ? q.dom.getNextNode(C) : q.dom.getPrevNode(C),
                A, E = null;
            A = this._getIceNode(B, s) || this._getIceNode(B, r);
            if (!A) {
                if (this._isInsertNode(B) || this._isDeleteNode(B)) {
                    A = B
                }
            }
            if (A && this._isCurrentUserIceNode(A)) {
                E = A.getAttribute(this.attributes.changeId)
            }
            return E
        }
    };
    var t = (window && window.console) || {
        log: function () {},
        error: function () {},
        info: function () {},
        assert: function () {},
        count: function () {}
    };

    function z(F) {
        var D = F.attributes,
            B, A = D && D.length,
            C = {};
        for (var E = 0; E < A; ++E) {
            B = D[E];
            C[B.name] = B.value
        }
        return C
    }

    function k(C) {
        var B = null,
            A;
        try {
            while (C.attributes.length > 0) {
                A = C.attributes[0];
                if (A === B) {
                    return
                }
                B = A;
                C.removeAttribute(A.name)
            }
        } catch (D) {}
    }

    function g(A) {
        return A
    }

    function f(B) {
        var A = e.map(B.attributes, function (C) {
            return C.name
        });
        e(B).removeClass();
        e.each(A, function (C, D) {
            B.removeAttribute(D)
        })
    }

    function y(A) {
        return j == q.dom.getTagName(A)
    }

    function p(B) {
        var A = q.dom.getTagName(B);
        return j === A || w === A
    }

    function u(B, C) {
        if (!B) {
            return false
        }
        var A = B.nodeType;
        if (q.dom.TEXT_NODE == A) {
            return C && B.nodeValue && (C >= B.nodeValue.length - 1)
        }
        if (q.dom.ELEMENT_NODE == A) {
            return B.childNodes && B.childNodes.length && (C >= B.childNodes.length)
        }
        return false
    }
    var v = null;

    function l(A, D) {
        if (!A || !D || A.collapsed) {
            return A
        }
        var C;
        try {
            while ((C = A.endContainer) && (C !== D) && (A.endOffset == 0) && !A.collapsed) {
                if (C.previousSibling) {
                    A.setEndBefore(C)
                } else {
                    if (C.parentNode && C.parentNode !== D) {
                        A.setEndBefore(C.parentNode)
                    }
                }
                if (A.endContainer == C) {
                    break
                }
            }
        } catch (B) {
            v(B, "fixSelection, while trying to set end")
        }
        try {
            while ((C = A.startContainer) && (C !== D) && !A.collapsed) {
                C = A.startContainer;
                if (C.nodeType == q.dom.TEXT_NODE) {
                    if (A.startOffset >= C.nodeValue.length) {
                        A.setStartAfter(C)
                    }
                } else {
                    if (A.startOffset >= C.childNodes.length) {
                        A.setStartAfter(C)
                    }
                }
                if (A.startContainer == C) {
                    break
                }
            }
        } catch (B) {
            v(B, "fixSelection, while trying to set start")
        }
    }

    function n(E, A, D) {
        var C = E.length,
            B;
        if (A < 0 || A >= C) {
            return E
        }
        if (A + D >= C) {
            D = C - A
        }
        if (D === C) {
            return E
        }
        B = A > 0 ? E.splitText(A) : E;
        if (B.length > D) {
            B.splitText(D)
        }
        return B
    }

    function x(D, B, E, C) {
        if (C) {
            if (B.collapsed && B.startContainer && B.startContainer.nodeType === q.dom.TEXT_NODE && B.startContainer.length) {
                return
            }
            var A = E.createTextNode("\uFEFF");
            if (D) {
                D.appendChild(A)
            } else {
                B.insertNode(A)
            }
            B.selectNode(A)
        } else {
            if (D) {
                B.selectNodeContents(D)
            }
        }
    }

    function a(B, D) {
        if (!B || !B.startContainer || !B.endContainer) {
            return
        }
        var E = [];

        function A(H) {
            if (!H) {
                return ""
            }
            H = H.replace("/\n/g", "\\n").replace("/\r/g", "").replace("\u200B", "{filler}").replace("\uFEFF", "{filler}");
            if (H.length <= 15) {
                return H
            }
            return H.substring(0, 5) + "..." + H.substring(H.length - 5)
        }

        function F(I) {
            var J;
            if (I.nodeType === 3) {
                J = "Text:" + A(I.nodeValue)
            } else {
                var H = I.innerText;
                J = I.nodeName + (H ? "(" + A(H) + ")" : "")
            }
            E.push("<" + J + " />")
        }

        function G(M, L, K) {
            if ("number" !== typeof K) {
                K = -1
            }
            if (3 == M.nodeType) {
                var H = M.nodeValue;
                E.push(A(H.substring(0, L)));
                E.push("|");
                if (K > L) {
                    E.push(A(H.substring(L, K)));
                    E.push("|");
                    E.push(A(H.substring(K)))
                } else {
                    E.push(A(H.substring(L)))
                }
            } else {
                if (1 == M.nodeType) {
                    var J = 0,
                        I = M.childNodes,
                        O = 0;
                    F(M);
                    for (J = O; J < L; ++J) {
                        F(I[J])
                    }
                    E.push("|");
                    if (K > L) {
                        for (J = L; J < K; ++J) {
                            F(I[J])
                        }
                        E.push("|")
                    }
                    if (K > 0 && K < I.length) {
                        var N = I[K];
                        while (N) {
                            F(N);
                            N = N.nextSibling
                        }
                    }
                }
            }
        }
        if (B.startContainer === B.endContainer) {
            G(B.startContainer, B.startOffset, B.endOffset)
        } else {
            G(B.startContainer, B.startOffset);
            G(B.endContainer, B.endOffset)
        }
        var C = E.join(" ");
        if (D) {
            t.log(D + ":" + C)
        }
        return C
    }
    q.printRange = a;
    q.InlineChangeEditor = h
}(this.ice || window.ice, window.jQuery));
(function (k, g) {
    var e = k,
        c = {},
        f = null,
        d = /^\s*$/,
        i = /^\d+$/;
    c.DOM_VK_DELETE = 8;
    c.DOM_VK_LEFT = 37;
    c.DOM_VK_UP = 38;
    c.DOM_VK_RIGHT = 39;
    c.DOM_VK_DOWN = 40;
    c.DOM_VK_ENTER = 13;
    c.ELEMENT_NODE = 1;
    c.ATTRIBUTE_NODE = 2;
    c.TEXT_NODE = 3;
    c.CDATA_SECTION_NODE = 4;
    c.ENTITY_REFERENCE_NODE = 5;
    c.ENTITY_NODE = 6;
    c.PROCESSING_INSTRUCTION_NODE = 7;
    c.COMMENT_NODE = 8;
    c.DOCUMENT_NODE = 9;
    c.DOCUMENT_TYPE_NODE = 10;
    c.DOCUMENT_FRAGMENT_NODE = 11;
    c.NOTATION_NODE = 12;
    c.CHARACTER_UNIT = "character";
    c.WORD_UNIT = "word";
    c.BREAK_ELEMENT = "br";
    c.PARAGRAPH_ELEMENT = "p";
    c.CONTENT_STUB_ELEMENTS = ["img", "hr", "iframe", "param", "link", "meta", "input", "frame", "col", "base", "area"];
    c.BLOCK_ELEMENTS = ["body", "p", "div", "pre", "ul", "ol", "li", "table", "tbody", "td", "th", "fieldset", "form", "blockquote", "dl", "dt", "dd", "dir", "center", "address", "h1", "h2", "h3", "h4", "h5", "h6"];
    c.TEXT_CONTAINER_ELEMENTS = ["body", "p", "div", "pre", "span", "b", "strong", "i", "li", "td", "th", "blockquote", "dt", "dd", "center", "address", "h1", "h2", "h3", "h4", "h5", "h6", "ins", "del"];
    c.STUB_ELEMENTS = c.CONTENT_STUB_ELEMENTS.slice();
    c.STUB_ELEMENTS.push(c.BREAK_ELEMENT);
    var j = c.CONTENT_STUB_ELEMENTS.join(", ");
    c.isEmptyString = function (n) {
        if (!n) {
            return true
        }
        var l = n.length - 1,
            m;
        while (l >= 0) {
            m = n[l--];
            if (m !== "\u200B" && m !== "\uFEFF") {
                return false
            }
        }
        return true
    };
    c.getKeyChar = function (l) {
        return String.fromCharCode(l.which)
    };
    c.getClass = function (n, m, l) {
        if (!m) {
            m = document.body
        }
        n = "." + n.split(" ").join(".");
        if (l) {
            n = l + n
        }
        return g.makeArray(g(m).find(n))
    };
    c.getId = function (m, l) {
        if (!l) {
            l = document
        }
        element = l.getElementById(m);
        return element
    };
    c.getTag = function (l, m) {
        if (!m) {
            m = document
        }
        return g.makeArray(g(m).find(l))
    };
    c.getElementWidth = function (l) {
        return l.offsetWidth
    };
    c.getElementHeight = function (l) {
        return l.offsetHeight
    };
    c.getElementDimensions = function (l) {
        return {
            width: c.getElementWidth(l),
            height: c.getElementHeight(l)
        }
    };
    c.insertBefore = function (m, l) {
        g(m).before(l)
    };
    c.insertAfter = function (o, n) {
        if (o && n) {
            var m = o.nextSibling,
                l = o.parentNode;
            return m ? l.insertBefore(n, m) : l.appendChild(n)
        }
    };
    c.removeWhitespace = function (l) {
        g(l).contents().filter(function () {
            if (this.nodeType != k.dom.TEXT_NODE && this.nodeName == "UL" || this.nodeName == "OL") {
                c.removeWhitespace(this);
                return false
            } else {
                if (this.nodeType != k.dom.TEXT_NODE) {
                    return false
                } else {
                    return !/\S/.test(this.nodeValue)
                }
            }
        }).remove()
    };
    c.contents = function (l) {
        return g.makeArray(g(l).contents())
    };
    c.extractContent = function (l) {
        var n = document.createDocumentFragment(),
            m;
        while ((m = l.firstChild)) {
            n.appendChild(m)
        }
        return n
    };
    c.getNode = function (m, l) {
        if (!m) {
            return null
        }
        m = m.$ || m;
        return (m.nodeType != c.TEXT_NODE && g(m).is(l)) ? m : c.parents(m, l)[0] || null
    };
    c.getParents = function (r, o, q) {
        var n = g(r).parents(o);
        var p = n.length;
        var l = [];
        for (var m = 0; m < p; m++) {
            if (n[m] === q) {
                break
            }
            l.push(n[m])
        }
        return l
    };
    c.hasBlockChildren = function (m) {
        var n = m.childNodes.length;
        for (var l = 0; l < n; l++) {
            if (m.childNodes[l].nodeType === c.ELEMENT_NODE) {
                if (c.isBlockElement(m.childNodes[l]) === true) {
                    return true
                }
            }
        }
        return false
    };
    c.removeTag = function (m, l) {
        g(m).find(l).replaceWith(function () {
            return g(this).contents()
        });
        return m
    };
    c.stripEnclosingTags = function (l, n) {
        var m = g(l);
        m.find("*").not(n).replaceWith(function () {
            var o = g();
            var q;
            try {
                q = g(this);
                o = q.contents()
            } catch (p) {}
            if (o.length === 0) {
                q.remove()
            }
            return o
        });
        return m[0]
    };
    c.getSiblings = function (o, n, p, m) {
        if (p === true) {
            if (n === "prev") {
                return g(o).prevAll()
            } else {
                return g(o).nextAll()
            }
        } else {
            var l = [];
            if (n === "prev") {
                while (o.previousSibling) {
                    o = o.previousSibling;
                    if (o === m) {
                        break
                    }
                    l.push(o)
                }
            } else {
                while (o.nextSibling) {
                    o = o.nextSibling;
                    if (o === m) {
                        break
                    }
                    l.push(o)
                }
            }
            return l
        }
    };
    c.getNodeTextContent = function (l) {
        return g(l).text()
    };
    c.getNodeStubContent = function (l) {
        return g(l).find(j)
    };
    c.hasNoTextOrStubContent = function (l) {
        var m = c.getNodeTextContent(l);
        if (!c.isEmptyString(m)) {
            return false
        }
        if (!l.firstChild) {
            return true
        }
        return g(l).find(j).length === 0
    };
    c.isEmptyTextNode = function (l) {
        if (!l || (c.TEXT_NODE !== l.nodeType)) {
            return false
        }
        if (l.length === 0) {
            return true
        }
        return c.isEmptyString(l.nodeValue)
    };
    c.getNodeCharacterLength = function (l) {
        return c.getNodeTextContent(l).length + g(l).find(c.STUB_ELEMENTS.join(", ")).length
    };
    c.setNodeTextContent = function (m, l) {
        return g(m).text(l)
    };
    c.getTagName = function (l) {
        return l && l.tagName && l.tagName.toLowerCase() || null
    };
    c.getIframeDocument = function (l) {
        var m = null;
        if (l.contentDocument) {
            m = l.contentDocument
        } else {
            if (l.contentWindow) {
                m = l.contentWindow.document
            } else {
                if (l.document) {
                    m = l.document
                }
            }
        }
        return m
    };
    c.isBlockElement = function (l) {
        return c.BLOCK_ELEMENTS.indexOf(l.nodeName.toLowerCase()) != -1
    };
    c.isStubElement = function (l) {
        return c.STUB_ELEMENTS.indexOf(l.nodeName.toLowerCase()) != -1
    };
    c.removeBRFromChild = function (l) {
        if (l && l.hasChildNodes()) {
            for (var m = 0; m < l.childNodes.length; m++) {
                var n = l.childNodes[m];
                if (n && (k.dom.BREAK_ELEMENT == k.dom.getTagName(n))) {
                    n.parentNode.removeChild(n)
                }
            }
        }
    };
    c.isChildOf = function (m, l) {
        try {
            while (m && m.parentNode) {
                if (m.parentNode === l) {
                    return true
                }
                m = m.parentNode
            }
        } catch (n) {}
        return false
    };
    c.isChildOfTagName = function (m, l) {
        try {
            while (m && m.parentNode) {
                if (m.parentNode && m.parentNode.tagName && m.parentNode.tagName.toLowerCase() === l) {
                    return m.parentNode
                }
                m = m.parentNode
            }
        } catch (n) {}
        return false
    };
    c.isChildOfTagNames = function (m, o) {
        try {
            while (m && m.parentNode) {
                if (m.parentNode && m.parentNode.tagName) {
                    tagName = m.parentNode.tagName.toLowerCase();
                    for (var l = 0; l < o.length; l++) {
                        if (tagName === o[l]) {
                            return m.parentNode
                        }
                    }
                }
                m = m.parentNode
            }
        } catch (n) {}
        return null
    };
    c.isChildOfClassName = function (m, l) {
        try {
            while (m && m.parentNode) {
                if (g(m.parentNode).hasClass(l)) {
                    return m.parentNode
                }
                m = m.parentNode
            }
        } catch (n) {}
        return null
    };
    c.replaceWith = function (m, l) {
        return g(m).replaceWith(l)
    };
    c.getElementsBetween = function (u, q) {
        var l = [];
        if (u === q) {
            return l
        }
        if (c.isChildOf(q, u) === true) {
            var r = u.childNodes.length;
            for (var o = 0; o < r; o++) {
                if (u.childNodes[o] === q) {
                    break
                } else {
                    if (c.isChildOf(q, u.childNodes[o]) === true) {
                        return c.arrayMerge(l, c.getElementsBetween(u.childNodes[o], q))
                    } else {
                        l.push(u.childNodes[o])
                    }
                }
            }
            return l
        }
        var n = u.nextSibling;
        while (n) {
            if (c.isChildOf(q, n) === true) {
                l = c.arrayMerge(l, c.getElementsBetween(n, q));
                return l
            } else {
                if (n === q) {
                    return l
                } else {
                    l.push(n);
                    n = n.nextSibling
                }
            }
        }
        var w = c.getParents(u);
        var s = c.getParents(q);
        var v = c.arrayDiff(w, s, true);
        var t = v.length;
        for (var m = 0; m < (t - 1); m++) {
            l = c.arrayMerge(l, c.getSiblings(v[m], "next"))
        }
        var p = v[(v.length - 1)];
        l = c.arrayMerge(l, c.getElementsBetween(p, q));
        return l
    };
    c.getCommonAncestor = function (m, l) {
        var n = m;
        while (n) {
            if (c.isChildOf(l, n) === true) {
                return n
            }
            n = n.parentNode
        }
        return null
    };
    c.getNextNode = function (m, l) {
        if (m) {
            while (m.parentNode) {
                if (m === l) {
                    return null
                }
                if (m.nextSibling) {
                    if (m.nextSibling.nodeType === c.TEXT_NODE && m.nextSibling.length === 0) {
                        m = m.nextSibling;
                        continue
                    }
                    return c.getFirstChild(m.nextSibling)
                }
                m = m.parentNode
            }
        }
        return null
    };
    c.getNextContentNode = function (m, l) {
        if (m) {
            while (m.parentNode) {
                if (m === l) {
                    return null
                }
                if (m.nextSibling && c.canContainTextElement(c.getBlockParent(m))) {
                    if (m.nextSibling.nodeType === c.TEXT_NODE && m.nextSibling.length === 0) {
                        m = m.nextSibling;
                        continue
                    }
                    return m.nextSibling
                } else {
                    if (m.nextElementSibling) {
                        return m.nextElementSibling
                    }
                }
                m = m.parentNode
            }
        }
        return null
    };
    c.getPrevNode = function (m, l) {
        if (m) {
            while (m.parentNode) {
                if (m === l) {
                    return null
                }
                if (m.previousSibling) {
                    if (m.previousSibling.nodeType === c.TEXT_NODE && m.previousSibling.length === 0) {
                        m = m.previousSibling;
                        continue
                    }
                    return c.getLastChild(m.previousSibling)
                }
                m = m.parentNode
            }
        }
        return null
    };
    c.getPrevContentNode = function (m, l) {
        if (m) {
            while (m.parentNode) {
                if (m === l) {
                    return null
                }
                if (m.previousSibling && c.canContainTextElement(c.getBlockParent(m))) {
                    if (m.previousSibling.nodeType === c.TEXT_NODE && m.previousSibling.length === 0) {
                        m = m.previousSibling;
                        continue
                    }
                    return m.previousSibling
                } else {
                    if (m.previousElementSibling) {
                        return m.previousElementSibling
                    }
                }
                m = m.parentNode
            }
        }
        return null
    };

    function h(n, l) {
        while (n) {
            if (c.TEXT_NODE == n.nodeType) {
                return n
            }
            for (var o = n.firstChild; o; o = o.nextSibling) {
                var m = h(o, l);
                if (m) {
                    return m
                }
            }
            if (c.isTextContainer(n)) {
                return n
            }
            n = n.nextSibling
        }
        return null
    }

    function a(n, l) {
        while (n) {
            if (c.TEXT_NODE == n.nodeType) {
                return n
            }
            for (var o = n.lastChild; o; o = o.previousSibling) {
                var m = a(o, l);
                if (m) {
                    return m
                }
            }
            if (c.isTextContainer(n)) {
                return n
            }
            n = n.previousSibling
        }
        return null
    }
    c.findPrevTextContainer = function (n, l) {
        if (!n || n == l) {
            return {
                node: l,
                offset: 0
            }
        }
        if (n.parentNode && c.isTextContainer(n.parentNode)) {
            return {
                node: n.parentNode,
                offset: c.getNodeIndex(n)
            }
        }
        while (n.previousSibling) {
            var m = a(n.previousSibling);
            if (m) {
                return {
                    node: m,
                    offset: c.getNodeLength(m)
                }
            }
            n = n.previousSibling
        }
        return c.findPrevTextContainer(n.parentNode && n.parentNode.previousSibling, l)
    };
    c.findNextTextContainer = function (n, l) {
        if (!n || n == l) {
            return {
                node: l,
                offset: c.getNodeLength(l)
            }
        }
        if (n.parentNode && c.isTextContainer(n.parentNode)) {
            return {
                node: n.parentNode,
                offset: c.getNodeIndex(n) + 1
            }
        }
        while (n.nextSibling) {
            var m = h(n.nextSibling);
            if (m) {
                return {
                    node: m,
                    offset: 0
                }
            }
            n = n.previousSibling
        }
        return c.findNextTextContainer(n.parentNode && n.parentNode.nextSibling, l)
    };
    c.getNodeLength = function (l) {
        return l ? (c.TEXT_NODE == l.nodeType ? l.length : ((l.childNodes && l.childNodes.length) || 0)) : 0
    };
    c.isTextContainer = function (l) {
        return (l && (c.TEXT_NODE == l.nodeType) || c.TEXT_CONTAINER_ELEMENTS.indexOf((l.nodeName || "").toLowerCase()) >= 0)
    };
    c.getNodeIndex = function (m) {
        var l = 0;
        while ((m = m.previousSibling)) {
            ++l
        }
        return l
    };
    c.canContainTextElement = function (l) {
        if (l && l.nodeName) {
            return c.TEXT_CONTAINER_ELEMENTS.lastIndexOf(l.nodeName.toLowerCase()) != -1
        } else {
            return false
        }
    };
    c.getFirstChild = function (l) {
        if (l.firstChild) {
            if (l.firstChild.nodeType === c.ELEMENT_NODE) {
                return c.getFirstChild(l.firstChild)
            } else {
                return l.firstChild
            }
        }
        return l
    };
    c.getLastChild = function (l) {
        if (l.lastChild) {
            if (l.lastChild.nodeType === c.ELEMENT_NODE) {
                return c.getLastChild(l.lastChild)
            } else {
                return l.lastChild
            }
        }
        return l
    };
    c.removeEmptyNodes = function (n, o) {
        var l = g(n).find(":empty");
        var m = l.length;
        while (m > 0) {
            m--;
            if (c.isStubElement(l[m]) === false) {
                if (!o || o.call(this, l[m]) !== false) {
                    c.remove(l[m])
                }
            }
        }
    };
    c.create = function (l) {
        return g(l)[0]
    };
    c.children = function (l, m) {
        return g(l).children(m)
    };
    c.parent = function (m, l) {
        return g(m).parent(l)[0]
    };
    c.parents = function (m, l) {
        return g(m).parents(l)
    };
    c.walk = function (m, o, l) {
        if (!m) {
            return
        }
        if (!l) {
            l = 0
        }
        var n = o.call(this, m, l);
        if (n === false) {
            return
        }
        if (m.childNodes && m.childNodes.length > 0) {
            c.walk(m.firstChild, o, (l + 1))
        } else {
            if (m.nextSibling) {
                c.walk(m.nextSibling, o, l)
            } else {
                if (m.parentNode && m.parentNode.nextSibling) {
                    c.walk(m.parentNode.nextSibling, o, (l - 1))
                }
            }
        }
    };
    c.revWalk = function (l, n) {
        if (!l) {
            return
        }
        var m = n.call(this, l);
        if (m === false) {
            return
        }
        if (l.childNodes && l.childNodes.length > 0) {
            c.walk(l.lastChild, n)
        } else {
            if (l.previousSibling) {
                c.walk(l.previousSibling, n)
            } else {
                if (l.parentNode && l.parentNode.previousSibling) {
                    c.walk(l.parentNode.previousSibling, n)
                }
            }
        }
    };
    c.setStyle = function (l, n, m) {
        if (l) {
            g(l).css(n, m)
        }
    };
    c.getStyle = function (l, m) {
        return g(l).css(m)
    };
    c.hasClass = function (l, m) {
        return g(l).hasClass(m)
    };
    c.addClass = function (l, m) {
        g(l).addClass(m)
    };
    c.removeClass = function (l, m) {
        g(l).removeClass(m)
    };
    c.preventDefault = function (l) {
        l.preventDefault();
        c.stopPropagation(l)
    };
    c.stopPropagation = function (l) {
        l.stopPropagation()
    };
    c.isBlank = function (l) {
        return (!l || d.test(l))
    };
    c.isFn = function (l) {
        return (typeof l === "function")
    };
    c.isObj = function (l) {
        return (l !== null && typeof l === "object")
    };
    c.isset = function (l) {
        return (typeof l !== "undefined" && l !== null)
    };
    c.isArray = function (l) {
        return g.isArray(l)
    };
    c.isNumeric = function (l) {
        return l.match(i) !== null
    };
    c.getUniqueId = function () {
        var m = (new Date()).getTime();
        var l = Math.ceil(Math.random() * 1000000);
        var n = m + "" + l;
        return n.substr(5, 18).replace(/,/, "")
    };
    c.inArray = function (o, m) {
        var n = m.length;
        for (var l = 0; l < n; l++) {
            if (o === m[l]) {
                return true
            }
        }
        return false
    };
    c.arrayDiff = function (p, o, n) {
        var q = p.length,
            m, l = [];
        for (m = 0; m < q; m++) {
            if (c.inArray(p[m], o) === false) {
                l.push(p[m])
            }
        }
        if (n !== true) {
            q = o.length;
            for (m = 0; m < q; m++) {
                if (c.inArray(o[m], p) === false) {
                    l.push(o[m])
                }
            }
        }
        return l
    };
    c.arrayMerge = function (n, m) {
        var o = m.length,
            l;
        for (l = 0; l < o; l++) {
            n.push(m[l])
        }
        return n
    };
    c.stripTags = function (n, q) {
        if (typeof q === "string") {
            var p = g("<div>" + n + "</div>");
            p.find("*").not(q).remove();
            return p.html()
        } else {
            var l;
            var m = new RegExp(/<\/?(\w+)((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/gim);
            var o = n;
            while ((l = m.exec(n)) != null) {
                if (c.isset(q) === false || c.inArray(l[1], q) !== true) {
                    o = o.replace(l[0], "")
                }
            }
            return o
        }
    };
    c.browser = function () {
        if (f) {
            return g.extend({}, f)
        }
        f = (function () {
            function m(q) {
                q = q.toLowerCase();
                var p = /(chrome)[ \/]([\w.]+)/.exec(q) || /(webkit)[ \/]([\w.]+)/.exec(q) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(q) || /(msie) ([\w.]+)/.exec(q) || q.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(q) || [];
                return {
                    browser: p[1] || "",
                    version: p[2] || "0"
                }
            }
            var o = navigator.userAgent.toLowerCase(),
                l = m(o),
                n = {
                    type: "unknown",
                    version: 0,
                    msie: false
                };
            if (l.browser) {
                n[l.browser] = true;
                n.version = l.version || 0;
                n.type = l.browser
            }
            if (n.chrome) {
                n.webkit = true
            } else {
                if (n.webkit) {
                    n.safari = true
                }
            }
            if (n.webkit) {
                n.type = "webkit"
            }
            n.firefox = (/firefox/.test(o) == true);
            if (!n.msie) {
                n.msie = Boolean(/trident/.test(o))
            }
            return n
        })();
        return g.extend({}, f)
    };
    c.getBrowserType = function () {
        if (this._browserType === null) {
            var n = ["msie", "firefox", "chrome", "safari"];
            var m = n.length;
            for (var l = 0; l < m; l++) {
                var o = new RegExp(n[l], "i");
                if (o.test(navigator.userAgent) === true) {
                    this._browserType = n[l];
                    return this._browserType
                }
            }
            this._browserType = "other"
        }
        return this._browserType
    };
    c.getWebkitType = function () {
        if (c.browser().type !== "webkit") {
            console.log("Not a webkit!");
            return false
        }
        var l = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;
        if (l) {
            return "safari"
        }
        return "chrome"
    };
    c.isBrowser = function (l) {
        return (c.browser().type === l)
    };
    c.getBlockParent = function (m, l) {
        if (c.isBlockElement(m) === true) {
            return m
        }
        if (m) {
            while (m.parentNode) {
                m = m.parentNode;
                if (c.isBlockElement(m) === true) {
                    return m
                }
                if (m === l) {
                    return null
                }
            }
        }
        return null
    };
    c.findNodeParent = function (n, l, m) {
        if (n) {
            while (n.parentNode) {
                if (n === m) {
                    return null
                }
                if (g(n).is(l) === true) {
                    return n
                }
                n = n.parentNode
            }
        }
        return null
    };
    c.onBlockBoundary = function (p, n, o) {
        if (!p || !n) {
            return false
        }
        var m = o.join(", "),
            l = c.isChildOfTagNames(p, o) || g(p).is(m) && p || null,
            q = c.isChildOfTagNames(n, o) || g(n).is(m) && n || null;
        return (l !== q)
    };
    c.isOnBlockBoundary = function (o, n, l) {
        if (!o || !n) {
            return false
        }
        var m = c.getBlockParent(o, l) || c.isBlockElement(o, l) && o || null,
            p = c.getBlockParent(n, l) || c.isBlockElement(n, l) && n || null;
        return (m !== p)
    };
    c.mergeContainers = function (m, l) {
        if (!m || !l) {
            return false
        }
        if (m.nodeType === c.TEXT_NODE || c.isStubElement(m)) {
            l.appendChild(m)
        } else {
            if (m.nodeType === c.ELEMENT_NODE) {
                while (m.firstChild) {
                    l.appendChild(m.firstChild)
                }
                g(m).remove()
            }
        }
        return true
    };
    c.mergeBlockWithSibling = function (l, o, n) {
        var m = n ? g(o).next().get(0) : g(o).prev().get(0);
        if (n) {
            c.mergeContainers(m, o)
        } else {
            c.mergeContainers(o, m)
        }
        l.collapse(true);
        return true
    };
    c.date = function (w, t, m) {
        if (t === null && m) {
            t = c.tsIso8601ToTimestamp(m);
            if (!t) {
                return
            }
        }
        var o = new Date(t);
        var v = w.split("");
        var n = v.length;
        var p = "";
        for (var q = 0; q < n; q++) {
            var l = "";
            var s = v[q];
            switch (s) {
                case "D":
                case "l":
                    var u = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    l = u[o.getDay()];
                    if (s === "D") {
                        l = l.substring(0, 3)
                    }
                    break;
                case "F":
                case "m":
                    l = o.getMonth() + 1;
                    if (l < 10) {
                        l = "0" + l
                    }
                    break;
                case "M":
                    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    l = months[o.getMonth()];
                    if (s === "M") {
                        l = l.substring(0, 3)
                    }
                    break;
                case "d":
                    l = o.getDate();
                    break;
                case "S":
                    l = c.getOrdinalSuffix(o.getDate());
                    break;
                case "Y":
                    l = o.getFullYear();
                    break;
                case "y":
                    l = o.getFullYear();
                    l = l.toString().substring(2);
                    break;
                case "H":
                    l = o.getHours();
                    break;
                case "h":
                    l = o.getHours();
                    if (l === 0) {
                        l = 12
                    } else {
                        if (l > 12) {
                            l -= 12
                        }
                    }
                    break;
                case "i":
                    l = c.addNumberPadding(o.getMinutes());
                    break;
                case "a":
                    l = "am";
                    if (o.getHours() >= 12) {
                        l = "pm"
                    }
                    break;
                default:
                    l = s;
                    break
            }
            p += l
        }
        return p
    };
    c.getOrdinalSuffix = function (m) {
        var n = "";
        var l = (m % 100);
        if (l >= 4 && l <= 20) {
            n = "th"
        } else {
            switch (m % 10) {
                case 1:
                    n = "st";
                    break;
                case 2:
                    n = "nd";
                    break;
                case 3:
                    n = "rd";
                    break;
                default:
                    n = "th";
                    break
            }
        }
        return n
    };
    c.addNumberPadding = function (l) {
        if (l < 10) {
            l = "0" + l
        }
        return l
    };
    c.tsIso8601ToTimestamp = function (l) {
        var n = /(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/;
        var p = l.match(new RegExp(n));
        if (p) {
            var m = new Date();
            m.setDate(p[3]);
            m.setFullYear(p[1]);
            m.setMonth(p[2] - 1);
            m.setHours(p[4]);
            m.setMinutes(p[5]);
            m.setSeconds(p[6]);
            var o = (p[9] * 60);
            if (p[8] === "+") {
                o *= -1
            }
            o -= m.getTimezoneOffset();
            return (m.getTime() + (o * 60 * 1000))
        }
        return null
    };
    c.normalizeNode = function (m, l) {
        if (!m) {
            return
        }
        if (!c.browser().msie && (l !== true && "function" == typeof m.normalize)) {
            return m.normalize()
        }
        return b(m)
    };

    function b(o) {
        if (!o) {
            return
        }
        var l = 1;
        var m = 3;
        var q = o.firstChild;
        while (q) {
            if (q.nodeType == l) {
                b(q)
            } else {
                if (q.nodeType == m) {
                    var n;
                    while ((n = q.nextSibling) && n.nodeType == m) {
                        var p = n.nodeValue;
                        if (p != null && p.length) {
                            q.nodeValue = q.nodeValue + p
                        }
                        o.removeChild(n)
                    }
                }
            }
            q = q.nextSibling
        }
    }
    e.dom = c
}(this.ice || window.ice, window.jQuery));
(function (d) {
    var a = d,
        b = d.rangy,
        c;
    c = function (e) {
        this._selection = null;
        this.env = e;
        this._initializeRangeLibrary();
        this._getSelection()
    };
    c.prototype = {
        _getSelection: function () {
            if (this._selection) {
                this._selection.refresh()
            } else {
                if (this.env.frame) {
                    this._selection = b.getSelection(this.env.frame)
                } else {
                    this._selection = b.getSelection()
                }
            }
            return this._selection
        },
        createRange: function () {
            return b.createRange(this.env.document)
        },
        getRangeAt: function (h) {
            try {
                this._selection.refresh();
                return this._selection.getRangeAt(h)
            } catch (f) {
                this._selection = null;
                try {
                    return this._getSelection().getRangeAt(0)
                } catch (g) {}
            }
            return null
        },
        addRange: function (e) {
            this._selection || (this._selection = this._getSelection());
            this._selection.setSingleRange(e);
            this._selection.ranges = [e]
        },
        _initializeRangeLibrary: function () {
            var f = this;
            b.init();
            b.config.checkSelectionRanges = false;
            var e = function (i, j, h, g) {
                if (h === 0) {
                    return
                }
                var k = i.collapsed;
                switch (j) {
                    case ice.dom.CHARACTER_UNIT:
                        if (h > 0) {
                            i.moveCharRight(g, h)
                        } else {
                            i.moveCharLeft(g, h * -1)
                        }
                        break;
                    case ice.dom.WORD_UNIT:
                    default:
                        break
                }
                if (k) {
                    i.collapse(g)
                }
            };
            b.rangePrototype.moveStart = function (h, g) {
                e(this, h, g, true)
            };
            b.rangePrototype.moveEnd = function (h, g) {
                e(this, h, g, false)
            };
            b.rangePrototype.setRange = function (i, g, h) {
                if (i) {
                    this.setStart(g, h)
                } else {
                    this.setEnd(g, h)
                }
            };
            b.rangePrototype.moveCharLeft = function (j, i) {
                var h, l;
                if (j) {
                    h = this.startContainer;
                    l = this.startOffset
                } else {
                    h = this.endContainer;
                    l = this.endOffset
                }
                if (h.nodeType === ice.dom.ELEMENT_NODE) {
                    if (h.hasChildNodes() && l > 0) {
                        var k = h.childNodes[l - 1],
                            g = this.getLastSelectableChild(k);
                        if (g) {
                            h = g
                        } else {
                            h = this.getPreviousTextNode(k)
                        }
                        if (!h) {
                            return
                        }
                        l = h.data.length - i
                    } else {
                        l = i * -1
                    }
                } else {
                    l -= i
                }
                if (l < 0) {
                    while (l < 0) {
                        h = this.getPreviousTextNode(h);
                        if (!h) {
                            return
                        }
                        if (h.nodeType === ice.dom.ELEMENT_NODE) {
                            continue
                        }
                        l += h.data.length
                    }
                }
                this.setRange(j, h, l)
            };
            b.rangePrototype.moveCharRight = function (i, h) {
                var g, l;
                if (i) {
                    g = this.startContainer;
                    l = this.startOffset
                } else {
                    g = this.endContainer;
                    l = this.endOffset
                }
                if (g.nodeType === ice.dom.ELEMENT_NODE) {
                    var j = this.getNextTextNode(g.childNodes[Math.min(l, g.childNodes.length - 1)]);
                    if (j) {
                        g = j
                    } else {
                        g = this.getNextTextNode(g)
                    }
                    l = h
                } else {
                    l += h
                }
                if (!g) {
                    return
                }
                var k = (l - g.data.length);
                if (k > 0) {
                    while (k > 0) {
                        g = this.getNextContainer(g);
                        if (!g) {
                            return
                        }
                        if (g.nodeType === ice.dom.ELEMENT_NODE) {
                            continue
                        }
                        if (g.data.length >= k) {
                            break
                        } else {
                            if (g.data.length > 0) {
                                k -= g.data.length
                            }
                        }
                    }
                    l = k
                }
                this.setRange(i, g, l)
            };
            b.rangePrototype.getNextContainer = function (g, j) {
                if (!g) {
                    return null
                }
                j = j || [];
                while (g.nextSibling) {
                    g = g.nextSibling;
                    if (g.nodeType !== ice.dom.TEXT_NODE) {
                        var i = this.getFirstSelectableChild(g);
                        if (i !== null) {
                            return i
                        }
                    } else {
                        if (this.isSelectable(g) === true) {
                            return g
                        }
                    }
                }
                while (g && !g.nextSibling) {
                    g = g.parentNode
                }
                if (!g) {
                    return null
                }
                g = g.nextSibling;
                if (this.isSelectable(g) === true) {
                    return g
                } else {
                    if (ice.dom.isBlockElement(g) === true) {
                        j.push(g)
                    }
                }
                var h = this.getFirstSelectableChild(g);
                if (h !== null) {
                    return h
                }
                return this.getNextContainer(g, j)
            };
            b.rangePrototype.getPreviousContainer = function (g, j) {
                if (!g) {
                    return null
                }
                j = j || [];
                while (g.previousSibling) {
                    g = g.previousSibling;
                    if (g.nodeType !== ice.dom.TEXT_NODE) {
                        if (ice.dom.isStubElement(g) === true) {
                            return g
                        } else {
                            var i = this.getLastSelectableChild(g);
                            if (i !== null) {
                                return i
                            }
                        }
                    } else {
                        if (this.isSelectable(g) === true) {
                            return g
                        }
                    }
                }
                while (g && !g.previousSibling) {
                    g = g.parentNode
                }
                if (!g) {
                    return null
                }
                g = g.previousSibling;
                if (this.isSelectable(g) === true) {
                    return g
                } else {
                    if (ice.dom.isBlockElement(g) === true) {
                        j.push(g)
                    }
                }
                var h = this.getLastSelectableChild(g);
                if (h !== null) {
                    return h
                }
                return this.getPreviousContainer(g, j)
            };
            b.rangePrototype.getNextTextNode = function (g) {
                if (g.nodeType === ice.dom.ELEMENT_NODE) {
                    if (g.firstChild) {
                        var h = this.getFirstSelectableChild(g);
                        if (h) {
                            return h
                        }
                    }
                }
                g = this.getNextContainer(g);
                if (!g) {
                    return null
                }
                if (g.nodeType === ice.dom.TEXT_NODE) {
                    return g
                }
                return this.getNextTextNode(g)
            };
            b.rangePrototype.getPreviousTextNode = function (g, h) {
                g = this.getPreviousContainer(g, h);
                if (!g) {
                    return null
                }
                if (g.nodeType === ice.dom.TEXT_NODE) {
                    return g
                }
                return this.getPreviousTextNode(g, h)
            };
            b.rangePrototype.getFirstSelectableChild = function (h) {
                if (!h) {
                    return null
                }
                if (h.nodeType === ice.dom.TEXT_NODE) {
                    return h
                }
                var i = h.firstChild;
                while (i) {
                    if (this.isSelectable(i) === true) {
                        return i
                    } else {
                        if (i.firstChild) {
                            var g = this.getFirstSelectableChild(i);
                            if (g !== null) {
                                return g
                            } else {
                                i = i.nextSibling
                            }
                        } else {
                            i = i.nextSibling
                        }
                    }
                }
                return null
            };
            b.rangePrototype.getLastSelectableChild = function (h) {
                if (!h) {
                    return null
                }
                if (h.nodeType == ice.dom.TEXT_NODE) {
                    return h
                }
                var i = h.lastChild;
                while (i) {
                    if (this.isSelectable(i) === true) {
                        return i
                    } else {
                        if (i.lastChild) {
                            var g = this.getLastSelectableChild(i);
                            if (g !== null) {
                                return g
                            } else {
                                i = i.previousSibling
                            }
                        } else {
                            i = i.previousSibling
                        }
                    }
                }
                return null
            };
            b.rangePrototype.isSelectable = function (g) {
                return Boolean(g && g.nodeType === ice.dom.TEXT_NODE && g.data.length !== 0)
            };
            b.rangePrototype.getHTMLContents = function (g) {
                if (!g) {
                    g = this.cloneContents()
                }
                var h = f.env.document.createElement("div");
                h.appendChild(g.cloneNode(true));
                return h.innerHTML
            };
            b.rangePrototype.getHTMLContentsObj = function () {
                return this.cloneContents()
            }
        }
    };
    a.Selection = c
}(this.ice || window.ice));
(function (c, d) {
    var a = c,
        b;
    b = function (j, h, o) {
        this.env = j;
        this.element = j.element;
        this.selection = this.env.selection;
        if (!o) {
            this.removeBookmarks(this.element)
        }
        var n = h || this.selection.getRangeAt(0),
            h = n.cloneRange(),
            f = h.startContainer,
            m = h.startOffset,
            g;
        h.collapse(false);
        var k = this.env.document.createElement("span");
        k.style.display = "none";
        d(k).html("&nbsp;").addClass("iceBookmark iceBookmark_end").attr("iceBookmark", "end");
        h.insertNode(k);
        if (!c.dom.isChildOf(k, this.element)) {
            this.element.appendChild(k)
        }
        h.setStart(f, m);
        h.collapse(true);
        var i = this.env.document.createElement("span");
        i.style.display = "none";
        d(i).addClass("iceBookmark iceBookmark_start").html("&nbsp;").attr("iceBookmark", "start");
        try {
            h.insertNode(i);
            if (i.previousSibling === k) {
                g = i;
                i = k;
                k = g
            }
        } catch (l) {
            c.dom.insertBefore(k, i)
        }
        if (c.dom.isChildOf(i, this.element) === false) {
            if (this.element.firstChild) {
                c.dom.insertBefore(this.element.firstChild, i)
            } else {
                this.element.appendChild(i)
            }
        }
        if (!k.previousSibling) {
            g = this.env.document.createTextNode("");
            c.dom.insertBefore(k, g)
        }
        if (!i.nextSibling) {
            g = this.env.document.createTextNode("");
            c.dom.insertAfter(i, g)
        }
        n.setStart(i.nextSibling, 0);
        n.setEnd(k.previousSibling, (k.previousSibling.length || 0));
        this.start = i;
        this.end = k
    };
    b.prototype = {
        selectStartAndCollapse: function () {
            if (this.start) {
                var f = this.selection.getRangeAt(0);
                f.setStartBefore(this.start);
                f.collapse(true);
                d([this.start, this.end]).remove();
                try {
                    this.selection.addRange(f)
                } catch (g) {}
            }
        },
        remove: function () {
            if (this.start) {
                d([this.start, this.end]).remove();
                this.start = this.end = null
            }
        },
        selectBookmark: function () {
            var g = this.selection.getRangeAt(0),
                j = null,
                i = null,
                f = 0,
                h = null,
                l = this.start && this.start.parentNode;
            if (this.start.nextSibling === this.end || c.dom.getElementsBetween(this.start, this.end).length === 0) {
                if (this.end.nextSibling) {
                    j = c.dom.getFirstChild(this.end.nextSibling)
                } else {
                    if (this.start.previousSibling) {
                        j = c.dom.getFirstChild(this.start.previousSibling);
                        if (j.nodeType === c.dom.TEXT_NODE) {
                            f = j.length
                        }
                    } else {
                        this.end.parentNode.appendChild(this.env.document.createTextNode(""));
                        j = c.dom.getFirstChild(this.end.nextSibling)
                    }
                }
            } else {
                if (this.start.nextSibling) {
                    j = c.dom.getFirstChild(this.start.nextSibling)
                } else {
                    if (!this.start.previousSibling) {
                        var k = this.env.document.createTextNode("");
                        c.dom.insertBefore(this.start, k)
                    }
                    j = c.dom.getLastChild(this.start.previousSibling);
                    f = j.length
                }
                if (this.end.previousSibling) {
                    i = c.dom.getLastChild(this.end.previousSibling)
                } else {
                    i = c.dom.getFirstChild(this.end.nextSibling || this.end);
                    h = 0
                }
            }
            d([this.start, this.end]).remove();
            try {
                c.dom.normalize(l)
            } catch (m) {}
            if (i === null) {
                if (g) {
                    g.setEnd(j, f);
                    g.collapse(false)
                }
            } else {
                g.setStart(j, f);
                if (h === null) {
                    h = (i.length || 0)
                }
                g.setEnd(i, h)
            }
            try {
                this.selection.addRange(g)
            } catch (m) {}
        },
        getBookmark: function (f, e) {
            var g = c.dom.getClass("iceBookmark_" + e, f)[0];
            return g
        },
        removeBookmarks: function (e) {
            d(e).find("span.iceBookmark").remove()
        }
    };
    a.Bookmark = b
}(this.ice || window.ice, window.jQuery));
var LITE = {
    Events: {
        INIT: "lite:init",
        ACCEPT: "lite:accept",
        REJECT: "lite:reject",
        SHOW_HIDE: "lite:showHide",
        TRACKING: "lite:tracking",
        CHANGE: "lite:change",
        HOVER_IN: "lite:hover-in",
        HOVER_OUT: "lite:hover-out"
    },
    Commands: {
        TOGGLE_TRACKING: "lite-toggletracking",
        TOGGLE_SHOW: "lite-toggleshow",
        ACCEPT_ALL: "lite-acceptall",
        REJECT_ALL: "lite-rejectall",
        ACCEPT_ONE: "lite-acceptone",
        REJECT_ONE: "lite-rejectone",
        TOGGLE_TOOLTIPS: "lite-toggletooltips"
    }
};
(function (o) {
    var h, r, d, j, n, q, f, m, b, k, c, e = [].slice,
        p = [].indexOf || function (u) {
            for (var t = 0, s = this.length; t < s; t++) {
                if (t in this && this[t] === u) {
                    return t
                }
            }
            return -1
        },
        g = {}.hasOwnProperty;
    h = (function () {
        i.prototype.STICKS_OUT_TOP = 1;
        i.prototype.STICKS_OUT_BOTTOM = 2;
        i.prototype.STICKS_OUT_LEFT = 1;
        i.prototype.STICKS_OUT_RIGHT = 2;
        i.prototype["class"] = {
            container: "opentip-container",
            opentip: "opentip",
            header: "ot-header",
            content: "ot-content",
            loadingIndicator: "ot-loading-indicator",
            close: "ot-close",
            goingToHide: "ot-going-to-hide",
            hidden: "ot-hidden",
            hiding: "ot-hiding",
            goingToShow: "ot-going-to-show",
            showing: "ot-showing",
            visible: "ot-visible",
            loading: "ot-loading",
            ajaxError: "ot-ajax-error",
            fixed: "ot-fixed",
            showEffectPrefix: "ot-show-effect-",
            hideEffectPrefix: "ot-hide-effect-",
            stylePrefix: "style-"
        };

        function i(u, H, K, z) {
            var B, F, E, s, y, A, v, t, I, J, D, x, w, C, G = this;
            this.id = ++i.lastId;
            this.adapter = i.adapter;
            z = this.adapter.clone(z);
            if (typeof H === "object") {
                z = H;
                H = K = void 0
            } else {
                if (typeof K === "object") {
                    z = K;
                    K = void 0
                }
            }
            this._element = u;
            this._boundingElement = z.boundingElement;
            this._document = u.ownerDocument;
            this._window = this._document.defaultView;
            this._body = this._document.body;
            i.addTip(this);
            B = i.getTips(u);
            B.push(this);
            i.setTips(u, B);
            this.triggerElement = this.adapter.wrap(u);
            if (this.triggerElement.length > 1) {
                throw new Error("You can't call Opentip on multiple elements.")
            }
            if (this.triggerElement.length < 1) {
                throw new Error("Invalid element.")
            }
            this.loaded = false;
            this.loading = false;
            this.visible = false;
            this.currentPosition = {
                left: 0,
                top: 0
            };
            this.dimensions = {
                width: 100,
                height: 50
            };
            this.content = "";
            this.redraw = true;
            this.currentObservers = {
                showing: false,
                visible: false,
                hiding: false,
                hidden: false
            };
            if (K != null) {
                z.title = K
            }
            if (H != null) {
                this.setContent(H)
            }
            if (z["extends"] == null) {
                if (z.style != null) {
                    z["extends"] = z.style
                } else {
                    z["extends"] = i.defaultStyle
                }
            }
            s = [z];
            C = z;
            while (C["extends"]) {
                A = C["extends"];
                C = i.styles[A];
                if (C == null) {
                    throw new Error("Invalid style: " + A)
                }
                s.unshift(C);
                if (!((C["extends"] != null) || A === "standard")) {
                    C["extends"] = "standard"
                }
            }
            z = (D = this.adapter).extend.apply(D, [{}].concat(e.call(s)));
            z.hideTriggers = (function () {
                var O, N, L, M;
                L = z.hideTriggers;
                M = [];
                for (O = 0, N = L.length; O < N; O++) {
                    F = L[O];
                    M.push(F)
                }
                return M
            })();
            if (z.hideTrigger && z.hideTriggers.length === 0) {
                z.hideTriggers.push(z.hideTrigger)
            }
            x = ["tipJoint", "targetJoint", "stem"];
            for (v = 0, I = x.length; v < I; v++) {
                y = x[v];
                if (z[y] && typeof z[y] === "string") {
                    z[y] = new i.Joint(z[y])
                }
            }
            if (z.ajax && (z.ajax === true || !z.ajax)) {
                if (this.adapter.tagName(this.triggerElement) === "A") {
                    z.ajax = this.adapter.attr(this.triggerElement, "href")
                } else {
                    z.ajax = false
                }
            }
            if (z.showOn === "click" && this.adapter.tagName(this.triggerElement) === "A") {
                this.adapter.observe(this.triggerElement, "click", function (L) {
                    L.preventDefault();
                    L.stopPropagation();
                    return L.stopped = true
                })
            }
            if (z.target) {
                z.fixed = true
            }
            if (z.stem === true) {
                z.stem = new i.Joint(z.tipJoint)
            }
            if (z.target === true) {
                z.target = this.triggerElement
            } else {
                if (z.target) {
                    z.target = this.adapter.wrap(z.target)
                }
            }
            this.currentStem = z.stem;
            if (z.delay == null) {
                z.delay = z.showOn === "mouseover" ? 0.2 : 0
            }
            if (z.targetJoint == null) {
                z.targetJoint = new i.Joint(z.tipJoint).flip()
            }
            this.showTriggers = [];
            this.showTriggersWhenVisible = [];
            this.hideTriggers = [];
            if (z.showOn && z.showOn !== "creation") {
                this.showTriggers.push({
                    element: this.triggerElement,
                    event: z.showOn
                })
            }
            if (z.ajaxCache != null) {
                z.cache = z.ajaxCache;
                delete z.ajaxCache
            }
            this.options = z;
            this.bound = {};
            w = ["prepareToShow", "prepareToHide", "show", "hide", "reposition"];
            for (t = 0, J = w.length; t < J; t++) {
                E = w[t];
                this.bound[E] = (function (L) {
                    return function () {
                        return G[L].apply(G, arguments)
                    }
                })(E)
            }
            this.adapter.domReady(function () {
                G.activate();
                if (G.options.showOn === "creation") {
                    return G.prepareToShow()
                }
            })
        }
        i.prototype._setup = function () {
            var x, B, C, z, w, v, A, s, y, u, t;
            this.debug("Setting up the tooltip.");
            this._buildContainer(this.triggerElement);
            this.hideTriggers = [];
            y = this.options.hideTriggers;
            for (z = w = 0, A = y.length; w < A; z = ++w) {
                B = y[z];
                C = null;
                x = this.options.hideOn instanceof Array ? this.options.hideOn[z] : this.options.hideOn;
                if (typeof B === "string") {
                    switch (B) {
                        case "trigger":
                            x = x || "mouseout";
                            C = this.triggerElement;
                            break;
                        case "tip":
                            x = x || "mouseover";
                            C = this.container;
                            break;
                        case "target":
                            x = x || "mouseover";
                            C = this.options.target;
                            break;
                        case "closeButton":
                            break;
                        default:
                            throw new Error("Unknown hide trigger: " + B + ".")
                    }
                } else {
                    x = x || "mouseover";
                    C = this.adapter.wrap(B)
                }
                if (C) {
                    this.hideTriggers.push({
                        element: C,
                        event: x,
                        original: B
                    })
                }
            }
            u = this.hideTriggers;
            t = [];
            for (v = 0, s = u.length; v < s; v++) {
                B = u[v];
                t.push(this.showTriggersWhenVisible.push({
                    element: B.element,
                    event: "mouseover"
                }))
            }
            return t
        };
        i.prototype._buildContainer = function (s) {
            this.container = this.adapter.create('<div id="opentip-' + this.id + '" class="' + this["class"].container + " " + this["class"].hidden + " " + this["class"].stylePrefix + this.options.className + '"></div>', this._document);
            this.adapter.css(this.container, {
                position: "absolute"
            });
            if (this.options.ajax) {
                this.adapter.addClass(this.container, this["class"].loading)
            }
            if (this.options.fixed) {
                this.adapter.addClass(this.container, this["class"].fixed)
            }
            if (this.options.showEffect) {
                this.adapter.addClass(this.container, "" + this["class"].showEffectPrefix + this.options.showEffect)
            }
            if (this.options.hideEffect) {
                return this.adapter.addClass(this.container, "" + this["class"].hideEffectPrefix + this.options.hideEffect)
            }
        };
        i.prototype._buildElements = function () {
            var s, u, t = this._document;
            this.tooltipElement = this.adapter.create('<div class="' + this["class"].opentip + '"><div class="' + this["class"].header + '"></div><div class="' + this["class"].content + '"></div></div>', t);
            this.backgroundCanvas = this.adapter.wrap(t.createElement("canvas"));
            this.adapter.css(this.backgroundCanvas, {
                position: "absolute"
            });
            if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
                G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas))
            }
            s = this.adapter.find(this.tooltipElement, "." + this["class"].header);
            if (this.options.title) {
                u = this.adapter.create("<h1></h1>", t);
                this.adapter.update(u, this.options.title, this.options.escapeTitle);
                this.adapter.append(s, u)
            }
            if (this.options.ajax && !this.loaded) {
                this.adapter.append(this.tooltipElement, this.adapter.create('<div class="' + this["class"].loadingIndicator + '"><span>↻</span></div>', t))
            }
            if (p.call(this.options.hideTriggers, "closeButton") >= 0) {
                this.closeButtonElement = this.adapter.create('<a href="javascript:undefined;" class="' + this["class"].close + '"><span>Close</span></a>', t);
                this.adapter.append(s, this.closeButtonElement)
            }
            this.adapter.append(this.container, this.backgroundCanvas);
            this.adapter.append(this.container, this.tooltipElement);
            this.adapter.append(this._body, this.container);
            this._newContent = true;
            return this.redraw = true
        };
        i.prototype.setContent = function (s) {
            this.content = s;
            this._newContent = true;
            if (typeof this.content === "function") {
                this._contentFunction = this.content;
                this.content = ""
            } else {
                this._contentFunction = null
            }
            if (this.visible) {
                return this._updateElementContent()
            }
        };
        i.prototype._updateElementContent = function () {
            var s;
            if (this._newContent || (!this.options.cache && this._contentFunction)) {
                s = this.adapter.find(this.container, "." + this["class"].content);
                if (s != null) {
                    if (this._contentFunction) {
                        this.debug("Executing content function.");
                        this.content = this._contentFunction(this)
                    }
                    this.adapter.update(s, this.content, this.options.escapeContent)
                }
                this._newContent = false
            }
            this._storeAndLockDimensions();
            return this.reposition()
        };
        i.prototype._storeAndLockDimensions = function () {
            var s;
            if (!this.container) {
                return
            }
            s = this.dimensions;
            this.adapter.css(this.container, {
                width: "auto",
                left: "0px",
                top: "0px"
            });
            this.dimensions = this.adapter.dimensions(this.container);
            this.dimensions.width += 1;
            this.adapter.css(this.container, {
                width: "" + this.dimensions.width + "px",
                top: "" + this.currentPosition.top + "px",
                left: "" + this.currentPosition.left + "px"
            });
            if (!this._dimensionsEqual(this.dimensions, s)) {
                this.redraw = true;
                return this._draw()
            }
        };
        i.prototype.activate = function () {
            return this._setupObservers("hidden", "hiding")
        };
        i.prototype.deactivate = function (s) {
            if (s) {
                this.adapter.extend(this.options, s)
            }
            this.hide();
            i.removeTip(this);
            return this._setupObservers("-showing", "-visible", "-hidden", "-hiding")
        };
        i.prototype._setupObservers = function () {
            var E, H, u, I, w, C, B, z, x, G, v, t, s, D, A, y, F = this;
            I = 1 <= arguments.length ? e.call(arguments, 0) : [];
            for (C = 0, G = I.length; C < G; C++) {
                u = I[C];
                H = false;
                if (u.charAt(0) === "-") {
                    H = true;
                    u = u.substr(1)
                }
                if (this.currentObservers[u] === !H) {
                    continue
                }
                this.currentObservers[u] = !H;
                E = function () {
                    var K, L, J;
                    K = 1 <= arguments.length ? e.call(arguments, 0) : [];
                    if (H) {
                        return (L = F.adapter).stopObserving.apply(L, K)
                    } else {
                        return (J = F.adapter).observe.apply(J, K)
                    }
                };
                switch (u) {
                    case "showing":
                        D = this.hideTriggers;
                        for (B = 0, v = D.length; B < v; B++) {
                            w = D[B];
                            E(w.element, w.event, this.bound.prepareToHide)
                        }
                        E((document.onresize != null ? document : window), "resize", this.bound.reposition);
                        E(window, "scroll", this.bound.reposition);
                        break;
                    case "visible":
                        A = this.showTriggersWhenVisible;
                        for (z = 0, t = A.length; z < t; z++) {
                            w = A[z];
                            E(w.element, w.event, this.bound.prepareToShow)
                        }
                        break;
                    case "hiding":
                        y = this.showTriggers;
                        for (x = 0, s = y.length; x < s; x++) {
                            w = y[x];
                            E(w.element, w.event, this.bound.prepareToShow)
                        }
                        break;
                    case "hidden":
                        break;
                    default:
                        throw new Error("Unknown state: " + u)
                }
            }
            return null
        };
        i.prototype.prepareToShow = function () {
            this._abortHiding();
            this._abortShowing();
            if (this.visible) {
                return
            }
            this.debug("Showing in " + this.options.delay + "s.");
            if (this.container == null) {
                this._setup()
            }
            if (this.options.group) {
                i._abortShowingGroup(this.options.group, this)
            }
            this.preparingToShow = true;
            this._setupObservers("-hidden", "-hiding", "showing");
            this._followMousePosition();
            if (this.options.fixed && !this.options.target) {
                this.initialMousePosition = n
            }
            this.reposition();
            return this._showTimeoutId = this.setTimeout(this.bound.show, this.options.delay || 0)
        };
        i.prototype.show = function () {
            var s = this;
            this._abortHiding();
            if (this.visible) {
                return
            }
            this._clearTimeouts();
            if (!this._triggerElementExists()) {
                return this.deactivate()
            }
            this.debug("Showing now.");
            if (this.container == null) {
                this._setup()
            }
            if (this.options.group) {
                i._hideGroup(this.options.group, this)
            }
            this.visible = true;
            this.preparingToShow = false;
            if (this.tooltipElement == null) {
                this._buildElements()
            }
            this._updateElementContent();
            if (this.options.ajax && (!this.loaded || !this.options.cache)) {
                this._loadAjax()
            }
            this._searchAndActivateCloseButtons();
            this._startEnsureTriggerElement();
            this.adapter.css(this.container, {
                zIndex: i.lastZIndex++
            });
            this._setupObservers("-hidden", "-hiding", "-showing", "-visible", "showing", "visible");
            if (this.options.fixed && !this.options.target) {
                this.initialMousePosition = n
            }
            this.reposition();
            this.adapter.removeClass(this.container, this["class"].hiding);
            this.adapter.removeClass(this.container, this["class"].hidden);
            this.adapter.addClass(this.container, this["class"].goingToShow);
            this.setCss3Style(this.container, {
                transitionDuration: "0s"
            });
            this.defer(function () {
                var t;
                if (!s.visible || s.preparingToHide) {
                    return
                }
                s.adapter.removeClass(s.container, s["class"].goingToShow);
                s.adapter.addClass(s.container, s["class"].showing);
                t = 0;
                if (s.options.showEffect && s.options.showEffectDuration) {
                    t = s.options.showEffectDuration
                }
                s.setCss3Style(s.container, {
                    transitionDuration: "" + t + "s"
                });
                s._visibilityStateTimeoutId = s.setTimeout(function () {
                    s.adapter.removeClass(s.container, s["class"].showing);
                    return s.adapter.addClass(s.container, s["class"].visible)
                }, t);
                return s._activateFirstInput()
            });
            return this._draw()
        };
        i.prototype._abortShowing = function () {
            if (this.preparingToShow) {
                this.debug("Aborting showing.");
                this._clearTimeouts();
                this._stopFollowingMousePosition();
                this.preparingToShow = false;
                return this._setupObservers("-showing", "-visible", "hiding", "hidden")
            }
        };
        i.prototype.prepareToHide = function () {
            this._abortShowing();
            this._abortHiding();
            if (!this.visible) {
                return
            }
            this.preparingToHide = true;
            this._setupObservers("-showing", "visible", "-hidden", "hiding");
            return this._hideTimeoutId = this.setTimeout(this.bound.hide, this.options.hideDelay)
        };
        i.prototype.hide = function () {
            var v = this,
                t;
            this._abortShowing();
            if (!this.visible) {
                return
            }
            this._clearTimeouts();
            this.visible = false;
            this.preparingToHide = false;
            this._stopEnsureTriggerElement();
            this._setupObservers("-showing", "-visible", "-hiding", "-hidden", "hiding", "hidden");
            if (this._element) {
                var s = this.adapter.data(this._element, "__opentips") || [];
                for (var u = s.length; u--;) {
                    if (s[u] == this) {
                        s.slice(u, 1)
                    }
                }
                i.setTips(this._element, s)
            }
            if (!this.options.fixed) {
                this._stopFollowingMousePosition()
            }
            if (!this.container) {
                return
            }
            t = this["class"];
            this.adapter.removeClass(this.container, t.visible);
            this.adapter.removeClass(this.container, t.showing);
            this.adapter.addClass(this.container, t.goingToHide);
            this.setCss3Style(this.container, {
                transitionDuration: "0s"
            });
            return this.defer(function () {
                var w;
                v.adapter.removeClass(v.container, v["class"].goingToHide);
                v.adapter.addClass(v.container, v["class"].hiding);
                w = 0;
                if (v.options.hideEffect && v.options.hideEffectDuration) {
                    w = v.options.hideEffectDuration
                }
                v.setCss3Style(v.container, {
                    transitionDuration: "" + w + "s"
                });
                return v._visibilityStateTimeoutId = v.setTimeout(function () {
                    v.adapter.removeClass(v.container, v["class"].hiding);
                    v.adapter.addClass(v.container, v["class"].hidden);
                    v.setCss3Style(v.container, {
                        transitionDuration: "0s"
                    });
                    if (v.options.removeElementsOnHide) {
                        v.adapter.remove(v.container);
                        delete v.container;
                        return delete v.tooltipElement
                    }
                }, w)
            })
        };
        i.prototype._abortHiding = function () {
            if (this.preparingToHide) {
                this.debug("Aborting hiding.");
                this._clearTimeouts();
                this.preparingToHide = false;
                return this._setupObservers("-hiding", "showing", "visible")
            }
        };
        i.prototype.reposition = function () {
            var s, u, t, v = this;
            s = this.getPosition();
            if (s == null) {
                return
            }
            u = this.options.stem;
            if (this.options.containInViewport) {
                t = this._ensureViewportContainment(s), s = t.position, u = t.stem
            }
            if (this._positionsEqual(s, this.currentPosition)) {
                return
            }
            if (!(!this.options.stem || u.eql(this.currentStem))) {
                this.redraw = true
            }
            this.currentPosition = s;
            this.currentStem = u;
            this._draw();
            this.adapter.css(this.container, {
                left: "" + s.left + "px",
                top: "" + s.top + "px"
            });
            return this.defer(function () {
                var x, w;
                x = v.adapter.unwrap(v.container);
                x.style.visibility = "hidden";
                w = x.offsetHeight;
                return x.style.visibility = "visible"
            })
        };
        i.prototype.getPosition = function (D, F, v) {
            var s, u, E, y, C, t, w, B, x, z = this._body,
                A = this._window;
            if (!this.container) {
                return
            }
            if (D == null) {
                D = this.options.tipJoint
            }
            if (F == null) {
                F = this.options.targetJoint
            }
            y = {};
            if (this.options.target) {
                w = this.adapter.offset(this.options.target);
                t = this.adapter.dimensions(this.options.target);
                y = w;
                if (F.right) {
                    B = this.adapter.unwrap(this.options.target);
                    if (B.getBoundingClientRect != null) {
                        y.left = B.getBoundingClientRect().right + ((x = A.pageXOffset) != null ? x : z.scrollLeft)
                    } else {
                        y.left += t.width
                    }
                } else {
                    if (F.center) {
                        y.left += Math.round(t.width / 2)
                    }
                }
                if (F.bottom) {
                    y.top += t.height
                } else {
                    if (F.middle) {
                        y.top += Math.round(t.height / 2)
                    }
                }
                if (this.options.borderWidth) {
                    if (this.options.tipJoint.left) {
                        y.left += this.options.borderWidth
                    }
                    if (this.options.tipJoint.right) {
                        y.left -= this.options.borderWidth
                    }
                    if (this.options.tipJoint.top) {
                        y.top += this.options.borderWidth
                    } else {
                        if (this.options.tipJoint.bottom) {
                            y.top -= this.options.borderWidth
                        }
                    }
                }
            } else {
                if (this.initialMousePosition) {
                    y = {
                        top: this.initialMousePosition.y,
                        left: this.initialMousePosition.x
                    }
                } else {
                    y = {
                        top: n.y,
                        left: n.x
                    }
                }
            }
            if (this.options.autoOffset) {
                C = this.options.stem ? this.options.stemLength : 0;
                E = C && this.options.fixed ? 2 : 10;
                s = D.middle && !this.options.fixed ? 15 : 0;
                u = D.center && !this.options.fixed ? 15 : 0;
                if (D.right) {
                    y.left -= E + s
                } else {
                    if (D.left) {
                        y.left += E + s
                    }
                }
                if (D.bottom) {
                    y.top -= E + u
                } else {
                    if (D.top) {
                        y.top += E + u
                    }
                }
                if (C) {
                    if (v == null) {
                        v = this.options.stem
                    }
                    if (v.right) {
                        y.left -= C
                    } else {
                        if (v.left) {
                            y.left += C
                        }
                    }
                    if (v.bottom) {
                        y.top -= C
                    } else {
                        if (v.top) {
                            y.top += C
                        }
                    }
                }
            }
            y.left += this.options.offset[0];
            y.top += this.options.offset[1];
            if (D.right) {
                y.left -= this.dimensions.width
            } else {
                if (D.center) {
                    y.left -= Math.round(this.dimensions.width / 2)
                }
            }
            if (D.bottom) {
                y.top -= this.dimensions.height
            } else {
                if (D.middle) {
                    y.top -= Math.round(this.dimensions.height / 2)
                }
            }
            return y
        };
        i.prototype._ensureViewportContainment = function (z) {
            var E, w, A, v, u, y, t, x, F, C, B, s, D = this._document;
            t = this.options.stem;
            A = {
                position: z,
                stem: t
            };
            if (!(this.visible && z)) {
                return A
            }
            x = this._sticksOut(z);
            if (!(x[0] || x[1])) {
                return A
            }
            C = new i.Joint(this.options.tipJoint);
            if (this.options.targetJoint) {
                F = new i.Joint(this.options.targetJoint)
            }
            y = this.adapter.scrollOffset(this._window, this._document);
            B = this._boundingElement ? this.adapter.dimensions(this._boundingElement) : this.adapter.viewportDimensions(D);
            s = [z.left - y[0], z.top - y[1]];
            E = false;
            if (B.width >= this.dimensions.width) {
                if (x[0]) {
                    E = true;
                    switch (x[0]) {
                        case this.STICKS_OUT_LEFT:
                            C.setHorizontal("right");
                            if (this.options.targetJoint) {
                                F.setHorizontal("right")
                            }
                            break;
                        case this.STICKS_OUT_RIGHT:
                            C.setHorizontal("left");
                            if (this.options.targetJoint) {
                                F.setHorizontal("left")
                            }
                    }
                }
            }
            if (B.height >= this.dimensions.height) {
                if (x[1]) {
                    E = true;
                    switch (x[1]) {
                        case this.STICKS_OUT_TOP:
                            C.setVertical("top");
                            if (this.options.targetJoint) {
                                F.setVertical("bottom")
                            }
                            break;
                        case this.STICKS_OUT_BOTTOM:
                            C.setVertical("bottom");
                            if (this.options.targetJoint) {
                                F.setVertical("top")
                            }
                    }
                }
            }
            if (!E) {
                return A
            }
            if (this.options.stem) {
                t = C
            }
            z = this.getPosition(C, F, t);
            w = this._sticksOut(z);
            v = false;
            u = false;
            if (w[0] && (w[0] !== x[0])) {
                v = true;
                C.setHorizontal(this.options.tipJoint.horizontal);
                if (this.options.targetJoint) {
                    F.setHorizontal(this.options.targetJoint.horizontal)
                }
            }
            if (w[1] && (w[1] !== x[1])) {
                u = true;
                C.setVertical(this.options.tipJoint.vertical);
                if (this.options.targetJoint) {
                    F.setVertical(this.options.targetJoint.vertical)
                }
            }
            if (v && u) {
                return A
            }
            if (v || u) {
                if (this.options.stem) {
                    t = C
                }
                z = this.getPosition(C, F, t)
            }
            return {
                position: z,
                stem: t
            }
        };
        i.prototype._sticksOut = function (t) {
            var u, v, s, w;
            v = this.adapter.scrollOffset(this._window, this._document);
            w = this._boundingElement ? this.adapter.dimensions(this._boundingElement) : this.adapter.viewportDimensions(doc);
            u = [t.left - v[0], t.top - v[1]];
            s = [false, false];
            if (u[0] < 0) {
                s[0] = this.STICKS_OUT_LEFT
            } else {
                if (u[0] + this.dimensions.width > w.width) {
                    s[0] = this.STICKS_OUT_RIGHT
                }
            }
            if (u[1] < 0) {
                s[1] = this.STICKS_OUT_TOP
            } else {
                if (u[1] + this.dimensions.height > w.height) {
                    s[1] = this.STICKS_OUT_BOTTOM
                }
            }
            return s
        };
        i.prototype._draw = function () {
            var E, D, B, x, t, H, I, F, z, C, y, L, s, J, u, K, A, w, v, G = this;
            if (!(this.backgroundCanvas && this.redraw)) {
                return
            }
            this.debug("Drawing background.");
            this.redraw = false;
            if (this.currentStem) {
                A = ["top", "right", "bottom", "left"];
                for (u = 0, K = A.length; u < K; u++) {
                    L = A[u];
                    this.adapter.removeClass(this.container, "stem-" + L)
                }
                this.adapter.addClass(this.container, "stem-" + this.currentStem.horizontal);
                this.adapter.addClass(this.container, "stem-" + this.currentStem.vertical)
            }
            H = [0, 0];
            I = [0, 0];
            if (p.call(this.options.hideTriggers, "closeButton") >= 0) {
                t = new i.Joint(((w = this.currentStem) != null ? w.toString() : void 0) === "top right" ? "top left" : "top right");
                H = [this.options.closeButtonRadius + this.options.closeButtonOffset[0], this.options.closeButtonRadius + this.options.closeButtonOffset[1]];
                I = [this.options.closeButtonRadius - this.options.closeButtonOffset[0], this.options.closeButtonRadius - this.options.closeButtonOffset[1]]
            }
            B = this.adapter.clone(this.dimensions);
            x = [0, 0];
            if (this.options.borderWidth) {
                B.width += this.options.borderWidth * 2;
                B.height += this.options.borderWidth * 2;
                x[0] -= this.options.borderWidth;
                x[1] -= this.options.borderWidth
            }
            if (this.options.shadow) {
                B.width += this.options.shadowBlur * 2;
                B.width += Math.max(0, this.options.shadowOffset[0] - this.options.shadowBlur * 2);
                B.height += this.options.shadowBlur * 2;
                B.height += Math.max(0, this.options.shadowOffset[1] - this.options.shadowBlur * 2);
                x[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]);
                x[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1])
            }
            D = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            if (this.currentStem) {
                if (this.currentStem.left) {
                    D.left = this.options.stemLength
                } else {
                    if (this.currentStem.right) {
                        D.right = this.options.stemLength
                    }
                }
                if (this.currentStem.top) {
                    D.top = this.options.stemLength
                } else {
                    if (this.currentStem.bottom) {
                        D.bottom = this.options.stemLength
                    }
                }
            }
            if (t) {
                if (t.left) {
                    D.left = Math.max(D.left, I[0])
                } else {
                    if (t.right) {
                        D.right = Math.max(D.right, I[0])
                    }
                }
                if (t.top) {
                    D.top = Math.max(D.top, I[1])
                } else {
                    if (t.bottom) {
                        D.bottom = Math.max(D.bottom, I[1])
                    }
                }
            }
            B.width += D.left + D.right;
            B.height += D.top + D.bottom;
            x[0] -= D.left;
            x[1] -= D.top;
            if (this.currentStem && this.options.borderWidth) {
                v = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth), J = v.stemLength, s = v.stemBase
            }
            E = this.adapter.unwrap(this.backgroundCanvas);
            E.width = B.width;
            E.height = B.height;
            this.adapter.css(this.backgroundCanvas, {
                width: "" + E.width + "px",
                height: "" + E.height + "px",
                left: "" + x[0] + "px",
                top: "" + x[1] + "px"
            });
            F = E.getContext("2d");
            F.setTransform(1, 0, 0, 1, 0, 0);
            F.clearRect(0, 0, E.width, E.height);
            F.beginPath();
            F.fillStyle = this._getColor(F, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal);
            F.lineJoin = "miter";
            F.miterLimit = 500;
            y = this.options.borderWidth / 2;
            if (this.options.borderWidth) {
                F.strokeStyle = this.options.borderColor;
                F.lineWidth = this.options.borderWidth
            } else {
                J = this.options.stemLength;
                s = this.options.stemBase
            }
            if (s == null) {
                s = 0
            }
            C = function (M, O, N) {
                if (N) {
                    F.moveTo(Math.max(s, G.options.borderRadius, H[0]) + 1 - y, -y)
                }
                if (O) {
                    F.lineTo(M / 2 - s / 2, -y);
                    F.lineTo(M / 2, -J - y);
                    return F.lineTo(M / 2 + s / 2, -y)
                }
            };
            z = function (S, N, O) {
                var R, P, M, Q;
                if (S) {
                    F.lineTo(-s + y, 0 - y);
                    F.lineTo(J + y, -J - y);
                    return F.lineTo(y, s - y)
                } else {
                    if (N) {
                        Q = G.options.closeButtonOffset;
                        M = H[0];
                        if (O % 2 !== 0) {
                            Q = [Q[1], Q[0]];
                            M = H[1]
                        }
                        R = Math.acos(Q[1] / G.options.closeButtonRadius);
                        P = Math.acos(Q[0] / G.options.closeButtonRadius);
                        F.lineTo(-M + y, -y);
                        return F.arc(y - Q[0], -y + Q[1], G.options.closeButtonRadius, -(Math.PI / 2 + R), P, false)
                    } else {
                        F.lineTo(-G.options.borderRadius + y, -y);
                        return F.quadraticCurveTo(y, -y, y, G.options.borderRadius - y)
                    }
                }
            };
            F.translate(-x[0], -x[1]);
            F.save();
            (function () {
                var S, R, M, N, V, U, T, W, Q, O, P;
                P = [];
                for (R = Q = 0, O = i.positions.length / 2; 0 <= O ? Q < O : Q > O; R = 0 <= O ? ++Q : --Q) {
                    V = R * 2;
                    U = R === 0 || R === 3 ? 0 : G.dimensions.width;
                    T = R < 2 ? 0 : G.dimensions.height;
                    W = (Math.PI / 2) * R;
                    M = R % 2 === 0 ? G.dimensions.width : G.dimensions.height;
                    N = new i.Joint(i.positions[V]);
                    S = new i.Joint(i.positions[V + 1]);
                    F.save();
                    F.translate(U, T);
                    F.rotate(W);
                    C(M, N.eql(G.currentStem), R === 0);
                    F.translate(M, 0);
                    z(S.eql(G.currentStem), S.eql(t), R);
                    P.push(F.restore())
                }
                return P
            })();
            F.closePath();
            F.save();
            if (this.options.shadow) {
                F.shadowColor = this.options.shadowColor;
                F.shadowBlur = this.options.shadowBlur;
                F.shadowOffsetX = this.options.shadowOffset[0];
                F.shadowOffsetY = this.options.shadowOffset[1]
            }
            F.fill();
            F.restore();
            if (this.options.borderWidth) {
                F.stroke()
            }
            F.restore();
            if (t) {
                return (function () {
                    var N, M, Q, P, O;
                    Q = M = G.options.closeButtonRadius * 2;
                    if (t.toString() === "top right") {
                        O = [G.dimensions.width - G.options.closeButtonOffset[0], G.options.closeButtonOffset[1]];
                        N = [O[0] + y, O[1] - y]
                    } else {
                        O = [G.options.closeButtonOffset[0], G.options.closeButtonOffset[1]];
                        N = [O[0] - y, O[1] - y]
                    }
                    F.translate(N[0], N[1]);
                    P = G.options.closeButtonCrossSize / 2;
                    F.save();
                    F.beginPath();
                    F.strokeStyle = G.options.closeButtonCrossColor;
                    F.lineWidth = G.options.closeButtonCrossLineWidth;
                    F.lineCap = "round";
                    F.moveTo(-P, -P);
                    F.lineTo(P, P);
                    F.stroke();
                    F.beginPath();
                    F.moveTo(P, -P);
                    F.lineTo(-P, P);
                    F.stroke();
                    F.restore();
                    return G.adapter.css(G.closeButtonElement, {
                        left: "" + (O[0] - P - G.options.closeButtonLinkOverscan) + "px",
                        top: "" + (O[1] - P - G.options.closeButtonLinkOverscan) + "px",
                        width: "" + (G.options.closeButtonCrossSize + G.options.closeButtonLinkOverscan * 2) + "px",
                        height: "" + (G.options.closeButtonCrossSize + G.options.closeButtonLinkOverscan * 2) + "px"
                    })
                })()
            }
        };
        i.prototype._getPathStemMeasures = function (v, B, s) {
            var w, t, z, y, x, u, A;
            y = s / 2;
            z = Math.atan((v / 2) / B);
            w = z * 2;
            x = y / Math.sin(w);
            t = 2 * x * Math.cos(z);
            A = y + B - t;
            if (A < 0) {
                throw new Error("Sorry but your stemLength / stemBase ratio is strange.")
            }
            u = (Math.tan(z) * A) * 2;
            return {
                stemLength: A,
                stemBase: u
            }
        };
        i.prototype._getColor = function (A, s, u, t) {
            var x, z, w, v, y;
            if (t == null) {
                t = false
            }
            if (typeof u === "string") {
                return u
            }
            if (t) {
                z = A.createLinearGradient(0, 0, s.width, 0)
            } else {
                z = A.createLinearGradient(0, 0, 0, s.height)
            }
            for (w = v = 0, y = u.length; v < y; w = ++v) {
                x = u[w];
                z.addColorStop(x[0], x[1])
            }
            return z
        };
        i.prototype._searchAndActivateCloseButtons = function () {
            var t, v, s, u;
            u = this.adapter.findAll(this.container, "." + this["class"].close);
            for (v = 0, s = u.length; v < s; v++) {
                t = u[v];
                this.hideTriggers.push({
                    element: this.adapter.wrap(t),
                    event: "click"
                })
            }
            if (this.currentObservers.showing) {
                this._setupObservers("-showing", "showing")
            }
            if (this.currentObservers.visible) {
                return this._setupObservers("-visible", "visible")
            }
        };
        i.prototype._activateFirstInput = function () {
            var s;
            s = this.adapter.unwrap(this.adapter.find(this.container, "input, textarea"));
            return s != null ? typeof s.focus === "function" ? s.focus() : void 0 : void 0
        };
        i.prototype._followMousePosition = function () {
            if (!this.options.fixed) {
                return i._observeMousePosition(this.bound.reposition)
            }
        };
        i.prototype._stopFollowingMousePosition = function () {
            if (!this.options.fixed) {
                return i._stopObservingMousePosition(this.bound.reposition)
            }
        };
        i.prototype._clearShowTimeout = function () {
            return clearTimeout(this._showTimeoutId)
        };
        i.prototype._clearHideTimeout = function () {
            return clearTimeout(this._hideTimeoutId)
        };
        i.prototype._clearTimeouts = function () {
            clearTimeout(this._visibilityStateTimeoutId);
            this._clearShowTimeout();
            return this._clearHideTimeout()
        };
        i.prototype._triggerElementExists = function () {
            var s;
            s = this.adapter.unwrap(this.triggerElement);
            while (s.parentNode) {
                if (s.parentNode.tagName === "BODY") {
                    return true
                }
                s = s.parentNode
            }
            return false
        };
        i.prototype._loadAjax = function () {
            var s = this;
            if (this.loading) {
                return
            }
            this.loaded = false;
            this.loading = true;
            this.adapter.addClass(this.container, this["class"].loading);
            this.setContent("");
            this.debug("Loading content from " + this.options.ajax);
            return this.adapter.ajax({
                url: this.options.ajax,
                method: this.options.ajaxMethod,
                onSuccess: function (t) {
                    s.debug("Loading successful.");
                    s.adapter.removeClass(s.container, s["class"].loading);
                    return s.setContent(t)
                },
                onError: function (t) {
                    var u;
                    u = s.options.ajaxErrorMessage;
                    s.debug(u, t);
                    s.setContent(u);
                    return s.adapter.addClass(s.container, s["class"].ajaxError)
                },
                onComplete: function () {
                    s.adapter.removeClass(s.container, s["class"].loading);
                    s.loading = false;
                    s.loaded = true;
                    s._searchAndActivateCloseButtons();
                    s._activateFirstInput();
                    return s.reposition()
                }
            })
        };
        i.prototype._ensureTriggerElement = function () {
            if (!this._triggerElementExists()) {
                this.deactivate();
                return this._stopEnsureTriggerElement()
            }
        };
        i.prototype._ensureTriggerElementInterval = 1000;
        i.prototype._startEnsureTriggerElement = function () {
            var s = this;
            return this._ensureTriggerElementTimeoutId = setInterval((function () {
                return s._ensureTriggerElement()
            }), this._ensureTriggerElementInterval)
        };
        i.prototype._stopEnsureTriggerElement = function () {
            return clearInterval(this._ensureTriggerElementTimeoutId)
        };
        return i
    })();
    m = ["khtml", "ms", "o", "moz", "webkit"];
    h.prototype.setCss3Style = function (t, u) {
        var x, v, w, s, i;
        t = this.adapter.unwrap(t);
        i = [];
        for (x in u) {
            if (!g.call(u, x)) {
                continue
            }
            v = u[x];
            if (t.style[x] != null) {
                i.push(t.style[x] = v)
            } else {
                i.push((function () {
                    var A, y, z;
                    z = [];
                    for (A = 0, y = m.length; A < y; A++) {
                        w = m[A];
                        s = "" + (this.ucfirst(w)) + (this.ucfirst(x));
                        if (t.style[s] != null) {
                            z.push(t.style[s] = v)
                        } else {
                            z.push(void 0)
                        }
                    }
                    return z
                }).call(this))
            }
        }
        return i
    };
    h.prototype.defer = function (i) {
        return setTimeout(i, 0)
    };
    h.prototype.setTimeout = function (i, s) {
        return setTimeout(i, s ? s * 1000 : 0)
    };
    h.prototype.ucfirst = function (i) {
        if (i == null) {
            return ""
        }
        return i.charAt(0).toUpperCase() + i.slice(1)
    };
    h.prototype.dasherize = function (i) {
        return i.replace(/([A-Z])/g, function (s, t) {
            return "-" + (t.toLowerCase())
        })
    };
    q = [];
    n = {
        x: 0,
        y: 0
    };
    j = function (v) {
        var t, u, s, i;
        n = h.adapter.mousePosition(v);
        i = [];
        for (u = 0, s = q.length; u < s; u++) {
            t = q[u];
            i.push(t())
        }
        return i
    };
    h._observeMousePosition = function (i) {
        return q.push(i)
    };
    h._stopObservingMousePosition = function (i) {
        var s;
        return q = (function () {
            var v, u, t;
            t = [];
            for (v = 0, u = q.length; v < u; v++) {
                s = q[v];
                if (s !== i) {
                    t.push(s)
                }
            }
            return t
        })()
    };
    h.Joint = (function () {
        function i(s) {
            if (s == null) {
                return
            }
            if (s instanceof h.Joint) {
                s = s.toString()
            }
            this.set(s)
        }
        i.prototype.set = function (s) {
            s = s.toLowerCase();
            this.setHorizontal(s);
            this.setVertical(s);
            return this
        };
        i.prototype.setHorizontal = function (v) {
            var w, y, z, x, u, t, s;
            y = ["left", "center", "right"];
            for (z = 0, u = y.length; z < u; z++) {
                w = y[z];
                if (~v.indexOf(w)) {
                    this.horizontal = w.toLowerCase()
                }
            }
            if (this.horizontal == null) {
                this.horizontal = "center"
            }
            s = [];
            for (x = 0, t = y.length; x < t; x++) {
                w = y[x];
                s.push(this[w] = this.horizontal === w ? w : void 0)
            }
            return s
        };
        i.prototype.setVertical = function (v) {
            var w, y, z, x, u, t, s;
            y = ["top", "middle", "bottom"];
            for (z = 0, u = y.length; z < u; z++) {
                w = y[z];
                if (~v.indexOf(w)) {
                    this.vertical = w.toLowerCase()
                }
            }
            if (this.vertical == null) {
                this.vertical = "middle"
            }
            s = [];
            for (x = 0, t = y.length; x < t; x++) {
                w = y[x];
                s.push(this[w] = this.vertical === w ? w : void 0)
            }
            return s
        };
        i.prototype.eql = function (s) {
            return (s != null) && this.horizontal === s.horizontal && this.vertical === s.vertical
        };
        i.prototype.flip = function () {
            var s, t;
            t = h.position[this.toString(true)];
            s = (t + 4) % 8;
            this.set(h.positions[s]);
            return this
        };
        i.prototype.toString = function (u) {
            var s, t;
            if (u == null) {
                u = false
            }
            t = this.vertical === "middle" ? "" : this.vertical;
            s = this.horizontal === "center" ? "" : this.horizontal;
            if (t && s) {
                if (u) {
                    s = h.prototype.ucfirst(s)
                } else {
                    s = " " + s
                }
            }
            return "" + t + s
        };
        return i
    })();
    h.prototype._positionsEqual = function (i, s) {
        return (i != null) && (s != null) && i.left === s.left && i.top === s.top
    };
    h.prototype._dimensionsEqual = function (s, i) {
        return (s != null) && (i != null) && s.width === i.width && s.height === i.height
    };
    h.prototype.debug = function () {
        var i;
        i = 1 <= arguments.length ? e.call(arguments, 0) : [];
        if (h.debug && ((typeof console !== "undefined" && console !== null ? console.debug : void 0) != null)) {
            i.unshift("#" + this.id + " |");
            return console.debug.apply(console, i)
        }
    };
    h.version = "2.4.6";
    h.debug = false;
    h.lastId = 0;
    h.lastZIndex = 100;
    h.tips = [];
    h._abortShowingGroup = function (x, w) {
        var t, v, s, u, i;
        u = h.tips;
        i = [];
        for (v = 0, s = u.length; v < s; v++) {
            t = u[v];
            if (t !== w && t.options.group === x) {
                i.push(t._abortShowing())
            } else {
                i.push(void 0)
            }
        }
        return i
    };
    h._hideGroup = function (x, w) {
        var t, v, s, u, i;
        u = h.tips;
        i = [];
        for (v = 0, s = u.length; v < s; v++) {
            t = u[v];
            if (t !== w && t.options.group === x) {
                i.push(t.hide())
            } else {
                i.push(void 0)
            }
        }
        return i
    };
    h.adapters = {};
    h.adapter = null;
    r = true;
    h.addAdapter = function (i) {
        h.adapters[i.name] = i;
        if (r) {
            h.adapter = i;
            return r = false
        }
    };
    h.positions = ["top", "topRight", "right", "bottomRight", "bottom", "bottomLeft", "left", "topLeft"];
    h.position = {};
    c = h.positions;
    for (d = b = 0, k = c.length; b < k; d = ++b) {
        f = c[d];
        h.position[f] = d
    }
    h.styles = {
        standard: {
            "extends": null,
            title: void 0,
            escapeTitle: true,
            escapeContent: false,
            className: "standard",
            stem: true,
            delay: null,
            hideDelay: 0.1,
            fixed: false,
            showOn: "mouseover",
            hideTrigger: "trigger",
            hideTriggers: [],
            hideOn: null,
            removeElementsOnHide: false,
            offset: [0, 0],
            containInViewport: true,
            autoOffset: true,
            showEffect: "appear",
            hideEffect: "fade",
            showEffectDuration: 0.3,
            hideEffectDuration: 0.2,
            stemLength: 5,
            stemBase: 8,
            tipJoint: "top left",
            target: null,
            targetJoint: null,
            cache: true,
            ajax: false,
            ajaxMethod: "GET",
            ajaxErrorMessage: "There was a problem downloading the content.",
            group: null,
            style: null,
            background: "#fff18f",
            backgroundGradientHorizontal: false,
            closeButtonOffset: [5, 5],
            closeButtonRadius: 7,
            closeButtonCrossSize: 4,
            closeButtonCrossColor: "#d2c35b",
            closeButtonCrossLineWidth: 1.5,
            closeButtonLinkOverscan: 6,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#f2e37b",
            shadow: true,
            shadowBlur: 10,
            shadowOffset: [3, 3],
            shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        glass: {
            "extends": "standard",
            className: "glass",
            background: [
                [0, "rgba(252, 252, 252, 0.8)"],
                [0.5, "rgba(255, 255, 255, 0.8)"],
                [0.5, "rgba(250, 250, 250, 0.9)"],
                [1, "rgba(245, 245, 245, 0.9)"]
            ],
            borderColor: "#eee",
            closeButtonCrossColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 15,
            closeButtonRadius: 10,
            closeButtonOffset: [8, 8]
        },
        dark: {
            "extends": "standard",
            className: "dark",
            borderRadius: 13,
            borderColor: "#444",
            closeButtonCrossColor: "rgba(240, 240, 240, 1)",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: [2, 2],
            background: [
                [0, "rgba(30, 30, 30, 0.7)"],
                [0.5, "rgba(30, 30, 30, 0.8)"],
                [0.5, "rgba(10, 10, 10, 0.8)"],
                [1, "rgba(10, 10, 10, 0.9)"]
            ]
        },
        alert: {
            "extends": "standard",
            className: "alert",
            borderRadius: 1,
            borderColor: "#AE0D11",
            closeButtonCrossColor: "rgba(255, 255, 255, 1)",
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: [2, 2],
            background: [
                [0, "rgba(203, 15, 19, 0.7)"],
                [0.5, "rgba(203, 15, 19, 0.8)"],
                [0.5, "rgba(189, 14, 18, 0.8)"],
                [1, "rgba(179, 14, 17, 0.9)"]
            ]
        }
    };
    h.defaultStyle = "standard";
    h.getTips = function (i) {
        return h.adapter.data(i, "__opentips") || []
    };
    h.setTips = function (s, i) {
        return h.adapter.data(s, "__opentips", i || [])
    };
    h.removeTip = function (t) {
        for (var s = h.tips.length; s--;) {
            var t = h.tips[s];
            if (t) {
                return h.tips.splice(s, 1)
            }
        }
    };
    h.addTip = function (i) {
        h.tips.push(i)
    };
    if (typeof module !== "undefined" && module !== null) {
        module.exports = h
    } else {
        window.Opentip = h
    }
    var e = [].slice;
    (function (i) {
        var s;
        jQuery.fn.opentip = function (u, v, t) {
            return new h(this, u, v, t)
        };
        s = (function () {
            function t() {}
            t.prototype.name = "jquery";
            t.prototype.domReady = function (u) {
                return jQuery(u)
            };
            t.prototype.create = function (u, v) {
                if (v) {
                    var w = v.createElement("div");
                    w.innerHTML = u;
                    w = w.firstChild;
                    w.parentNode.removeChild(w);
                    return jQuery(w)
                } else {
                    return jQuery(u)
                }
            };
            t.prototype.wrap = function (u) {
                u = i(u);
                if (u.length > 1) {
                    throw new Error("Multiple elements provided.")
                }
                return u
            };
            t.prototype.unwrap = function (u) {
                return i(u)[0]
            };
            t.prototype.tagName = function (u) {
                return this.unwrap(u).tagName
            };
            t.prototype.attr = function () {
                var u, v, w;
                v = arguments[0], u = 2 <= arguments.length ? e.call(arguments, 1) : [];
                return (w = i(v)).attr.apply(w, u)
            };
            t.prototype.data = function () {
                var u, v, w;
                v = arguments[0], u = 2 <= arguments.length ? e.call(arguments, 1) : [];
                return (w = jQuery(v)).data.apply(w, u)
            };
            t.prototype.find = function (v, u) {
                return jQuery(v).find(u).get(0)
            };
            t.prototype.findAll = function (v, u) {
                return jQuery(v).find(u)
            };
            t.prototype.update = function (u, w, v) {
                u = jQuery(u);
                if (v) {
                    return u.text(w)
                } else {
                    return u.html(w)
                }
            };
            t.prototype.append = function (u, v) {
                return i(u).append(v)
            };
            t.prototype.remove = function (u) {
                return i(u).remove()
            };
            t.prototype.addClass = function (u, v) {
                return i(u).addClass(v)
            };
            t.prototype.removeClass = function (u, v) {
                return i(u).removeClass(v)
            };
            t.prototype.css = function (v, u) {
                return i(v).css(u)
            };
            t.prototype.dimensions = function (u) {
                return {
                    width: i(u).outerWidth(),
                    height: i(u).outerHeight()
                }
            };
            t.prototype.scrollOffset = function (v, u) {
                return [v.pageXOffset || u.documentElement.scrollLeft || u.body.scrollLeft, v.pageYOffset || u.documentElement.scrollTop || u.body.scrollTop]
            };
            t.prototype.viewportDimensions = function (u) {
                return {
                    width: u.documentElement.clientWidth,
                    height: u.documentElement.clientHeight
                }
            };
            t.prototype.mousePosition = function (u) {
                if (u == null) {
                    return null
                }
                return {
                    x: u.pageX,
                    y: u.pageY
                }
            };
            t.prototype.offset = function (u) {
                var v;
                v = jQuery(u).offset();
                return {
                    left: v.left,
                    top: v.top
                }
            };
            t.prototype.observe = function (w, v, u) {
                return i(w).bind(v, u)
            };
            t.prototype.stopObserving = function (w, v, u) {
                return i(w).unbind(v, u)
            };
            t.prototype.ajax = function (v) {
                var w, u;
                if (v.url == null) {
                    throw new Error("No url provided")
                }
                return jQuery.ajax({
                    url: v.url,
                    type: (w = (u = v.method) != null ? u.toUpperCase() : void 0) != null ? w : "GET"
                }).done(function (x) {
                    return typeof v.onSuccess === "function" ? v.onSuccess(x) : void 0
                }).fail(function (x) {
                    return typeof v.onError === "function" ? v.onError("Server responded with status " + x.status) : void 0
                }).always(function () {
                    return typeof v.onComplete === "function" ? v.onComplete() : void 0
                })
            };
            t.prototype.clone = function (u) {
                return jQuery.extend({}, u)
            };
            t.prototype.extend = function () {
                var u, v;
                v = arguments[0], u = 2 <= arguments.length ? e.call(arguments, 1) : [];
                return jQuery.extend.apply(i, [v].concat(e.call(u)))
            };
            return t
        })();
        return h.addAdapter(new s)
    })(jQuery);
    var l = {
        removeElementsOnHide: true,
        fixed: true,
        showOn: "creation"
    };
    var a = {
        titleTemplate: "Changed by %u %t",
        delay: 1000
    };
    o.OpentipAdapter = function () {};
    o.OpentipAdapter.prototype = {
        init: function (i) {
            this._options = jQuery.extend(a, i || {});
            this._tips = []
        },
        showTooltip: function (s, v, u) {
            var i = jQuery.extend({
                    target: s,
                    boundingElement: u
                }, l),
                t = new h(s, v, i);
            t.show();
            jQuery(s).data("_lite_tip_", t)
        },
        hideAll: function (s) {
            try {
                for (var t = h.tips.length; t--;) {
                    h.tips[t].deactivate()
                }
            } catch (u) {}
            if (s && s.ownerDocument) {
                try {
                    h.adapter.wrap(s.ownerDocument.body).find("div." + h.prototype["class"]["container"]).remove()
                } catch (u) {}
            }
        },
        hideTooltip: function (w, t) {
            var s = h.getTips(w);
            if (s) {
                var u = {};
                if (t) {
                    u.hideDelay = 0;
                    u.hideEffectDuration = 0
                }
                for (var v = s.length; v--;) {
                    s[v].deactivate(u)
                }
            }
        }
    }
})(window);
(function (j, v) {
    var B = {
            Events: {
                INIT: "lite:init",
                ACCEPT: "lite:accept",
                REJECT: "lite:reject",
                SHOW_HIDE: "lite:showHide",
                TRACKING: "lite:tracking",
                CHANGE: "lite:change",
                HOVER_IN: "lite:hover-in",
                HOVER_OUT: "lite:hover-out"
            },
            Commands: {
                TOGGLE_TRACKING: "lite-toggletracking",
                TOGGLE_SHOW: "lite-toggleshow",
                ACCEPT_ALL: "lite-acceptall",
                REJECT_ALL: "lite-rejectall",
                ACCEPT_ONE: "lite-acceptone",
                REJECT_ONE: "lite-rejectone",
                TOGGLE_TOOLTIPS: "lite-toggletooltips"
            }
        },
        g = window.jQuery,
        u = {
            show: true,
            path: "js/opentip-adapter.js",
            classPath: "OpentipAdapter",
            cssPath: "css/opentip.css",
            delay: 500
        },
        i = {
            deleteTag: "del",
            insertTag: "ins",
            deleteClass: "ice-del",
            insertClass: "ice-ins",
            attributes: {
                changeId: "data-cid",
                userId: "data-userid",
                userName: "data-username",
                sessionId: "data-session-id",
                changeData: "data-changedata",
                time: "data-time",
                lastTime: "data-last-change-time"
            },
            stylePrefix: "ice-cts",
            preserveOnPaste: "p",
            css: "css/lite.css"
        },
        c = new RegExp("(?:^|s)(?:" + i.deleteClass + "|" + i.insertClass + ")(?:s|$)"),
        y = "%a by %u %t",
        q = null,
        k = /^[\s\r\n]*$/,
        D = [{
            regex: /[\s]*title=\"[^\"]+\"/g,
            replace: ""
        }, {
            regex: /[\s]*data-selected=\"[^\"]+\"/g,
            replace: ""
        }],
        p = [],
        C = [j.CTRL + 88, j.CTRL + 120, j.SHIFT + 46],
        l = false;

    function f(G) {
        return G && G.className && c(G.className)
    }

    function e(K) {
        var H, G, J, L;
        if (K.nodeType === q.dom.ELEMENT_NODE) {
            var I = K.childNodes;
            for (J = 0; J < I.length; ++J) {
                L = I[J];
                e(L);
                if (f(L)) {
                    while (L.firstChild) {
                        K.insertBefore(L.firstChild, L)
                    }
                    K.removeChild(L)
                }
            }
        }
        if (f(K)) {
            H = jQuery.makeArray(K.childNodes)
        } else {
            H = [K]
        }
        return H
    }

    function m(G) {
        if (!G || !G.length) {
            return []
        }
        var H = [];
        G.forEach(function (I) {
            H = H.concat(e(I))
        });
        return H
    }

    function t(G) {
        return C.indexOf(G) >= 0
    }

    function o(G) {
        if (G && G.$ && (typeof G.getDocument === "function")) {
            return G.$
        }
        return G
    }

    function r(H) {
        for (var G = p.length; G--;) {
            var I = p[G];
            if (I.editor === H) {
                return G
            }
        }
        return -1
    }

    function d(G) {
        var H = r(G);
        return H >= 0 ? p[H] : null
    }

    function s(G) {
        var H = d(G);
        return H && H.plugin
    }

    function x(G, H) {
        p.push({
            plugin: H,
            editor: G
        })
    }

    function A(I, J, G, L) {
        if (null === I || (typeof (I) === "undefined")) {
            I = ""
        } else {
            I = String(I)
        }
        G = String(G);
        var K = G.length;
        for (var H = I.length; H < J; H += K) {
            if (L) {
                I += G
            } else {
                I = G + I
            }
        }
        return I
    }

    function E(G, H) {
        return A(G, H, "0")
    }

    function a(J, I) {
        var H = new Date(),
            N = H.getDate(),
            L = H.getMonth(),
            M = H.getFullYear(),
            K, O;
        var P = typeof (J);
        if (P === "string" || P === "number") {
            J = new Date(J)
        }
        var G = I.MONTHS;
        if (N == J.getDate() && L == J.getMonth() && M == J.getFullYear()) {
            K = Math.floor((H.getTime() - J.getTime()) / 60000);
            if (K < 1) {
                return I.NOW
            } else {
                if (K < 2) {
                    return I.MINUTE_AGO
                } else {
                    if (K < 60) {
                        return (I.MINUTES_AGO.replace("xMinutes", K))
                    } else {
                        O = J.getHours();
                        K = J.getMinutes();
                        return I.AT + " " + E(O, 2) + ":" + E(K, 2, "0")
                    }
                }
            }
        } else {
            if (M == J.getFullYear()) {
                return I.ON + " " + I.LITE_LABELS_DATE(J.getDate(), J.getMonth())
            } else {
                return I.ON + " " + I.LITE_LABELS_DATE(J.getDate(), J.getMonth(), J.getFullYear())
            }
        }
    }
    var z = function (H) {
        var I = parseFloat(j.version),
            G = isNaN(I) || I < 4.4
    };

    function F(I, J) {
        var H, G = J && J.length;
        if (!I || !G) {
            return false
        }
        for (H = 0; H < G; ++H) {
            if (I.is(J[H])) {
                return true
            }
        }
        return false
    }
    j.plugins.add("lite", {
        icons: "lite-acceptall,lite-acceptone,lite-rejectall,lite-rejectone,lite-toggleshow,lite-toggletracking",
        hidpi: true,
        lang: ["en", "de"],
        _scriptsLoaded: null,
        init: function (P) {
            z();
            var M = d(P);
            if (M) {
                return
            }
            var V = this.path,
                O = new h(V),
                H = j.tools.extend({}, P.config.lite || {}),
                R = H.tooltips;
            if (undefined === R) {
                R = true
            }
            if (R === true) {
                R = u
            }
            H.tooltips = R;
            x(P, O);
            O.init(P, H);
            P.on("destroy", (function (W) {
                var X = r(W);
                if (X >= 0) {
                    p.splice(X, 1)
                }
            }).bind(this));
            if (this._scriptsLoaded) {
                O._onScriptsLoaded();
                return
            } else {
                if (this._scriptsLoaded === false) {
                    return
                }
            }
            this._scriptsLoaded = false;
            var J = (typeof (jQuery) === "function"),
                U = this,
                K = H.jQueryPath || "js/jquery.min.js",
                L = [],
                S = [];
            if (!v.ice) {
                var G = ["ns.js", "ice.js", "dom.js", "selection.js", "bookmark.js", "opentip-adapter.js"];
                if (window.requirejs && typeof window.require === "function") {
                    S.push({
                        name: "rangy",
                        globalName: "rangy"
                    })
                } else {
                    G.splice(1, 0, "rangy-core.js")
                }
                for (var N = 0, Q = G.length; N < Q; ++N) {
                    L.push(V + "js/" + G[N])
                }
            }
            if (!J) {
                L.splice(0, 0, this.path + K)
            }
            if (R.path && typeof v[R.classPath] === "undefined") {
                L.push(this.path + R.path)
            }
            var T = function () {
                if (L.length < 1 && S.length < 1) {
                    U._scriptsLoaded = true;
                    g = window.jQuery;
                    q = v.ice;
                    if (!J) {
                        jQuery.noConflict()
                    }
                    jQuery.each(p, (function (X, Y) {
                        Y.plugin._onScriptsLoaded()
                    }))
                } else {
                    var W = L.shift();
                    j.scriptLoader.load(W, function () {
                        T()
                    }, U)
                }
            };
            if (S.length) {
                function I(W) {
                    require([W.name], function (X) {
                        window[W.globalName] = X;
                        if (window.ice) {
                            window.ice[W.globalName] = X
                        }
                        var Y = S.indexOf(W);
                        if (Y >= 0) {
                            S.splice(Y, 1);
                            if (S.length < 1) {
                                T()
                            }
                        }
                    })
                }
                S.forEach(I)
            }
            T(L)
        },
        findPlugin: function (G) {
            return s(G)
        },
        startNewSession: function (G) {
            var H = s(G);
            if (H) {
                H.startNewSession()
            } else {
                b("startNewSession: plugin not found")
            }
        }
    });
    var h = function (G) {
        this.path = G
    };
    h.prototype = {
        init: function (O, K) {
            var I = O.lang.lite;
            this._editor = O;
            this._domLoaded = false;
            this._editor = null;
            this._tracker = null;
            this._isVisible = true;
            this._liteCommandNames = [];
            this._canAcceptReject = true;
            this._removeBindings = [];
            if (!y) {
                y = "%a " + I.lite.BY + " %u %t"
            }
            O.ui.addToolbarGroup("lite");
            this._setPluginFeatures(O, i);
            this._changeTimeout = null;
            this._notifyChange = this._notifyChange.bind(this);
            this._notifyTextChange = this._notifyTextChange.bind(this);
            this._config = K;
            var G = K.acceptRejectInReadOnly === true;
            var H = [{
                command: B.Commands.TOGGLE_TRACKING,
                exec: this._onToggleTracking,
                title: I.TOGGLE_TRACKING,
                trackingOnly: false
            }, {
                command: B.Commands.TOGGLE_SHOW,
                exec: this._onToggleShow,
                title: I.TOGGLE_SHOW,
                readOnly: true
            }, {
                command: B.Commands.ACCEPT_ALL,
                exec: this._onAcceptAll,
                title: I.ACCEPT_ALL,
                readOnly: G
            }, {
                command: B.Commands.REJECT_ALL,
                exec: this._onRejectAll,
                title: I.REJECT_ALL,
                readOnly: G
            }, {
                command: B.Commands.ACCEPT_ONE,
                exec: this._onAcceptOne,
                title: I.ACCEPT_ONE,
                readOnly: G
            }, {
                command: B.Commands.REJECT_ONE,
                exec: this._onRejectOne,
                title: I.REJECT_ONE,
                readOnly: G
            }, {
                command: B.Commands.TOGGLE_TOOLTIPS,
                exec: this._onToggleTooltips,
                readOnly: true
            }];
            this._isTracking = K.isTracking !== false;
            this._trackingState = null;
            this._eventsBounds = false;
            O.on("contentDom", (function (S) {
                this._onDomLoaded(S)
            }).bind(this));
            O.on("dataReady", (function (S) {
                this._onAfterSetData(S)
            }).bind(this));
            var R = this.path;
            var J = K.commands || [B.Commands.TOGGLE_TRACKING, B.Commands.TOGGLE_SHOW, B.Commands.ACCEPT_ALL, B.Commands.REJECT_ALL, B.Commands.ACCEPT_ONE, B.Commands.REJECT_ONE];
            var Q = this;

            function N(T) {
                O.addCommand(T.command, {
                    exec: T.exec.bind(Q),
                    readOnly: T.readOnly || false
                });
                if (T.title && J.indexOf(T.command) >= 0) {
                    var S = Q._commandNameToUIName(T.command);
                    O.ui.addButton(S, {
                        label: T.title,
                        command: T.command,
                        toolbar: "lite"
                    });
                    if (T.trackingOnly !== false) {
                        Q._liteCommandNames.push(T.command)
                    }
                }
            }
            for (var M = 0, P = H.length; M < P; ++M) {
                N(H[M])
            }
            if (K.contextMenu !== false) {
                if (O.addMenuItems) {
                    O.addMenuGroup("lite", 50);
                    var L = {};
                    if (J.indexOf(B.Commands.ACCEPT_ONE) >= 0) {
                        L[B.Commands.ACCEPT_ONE] = {
                            label: I.ACCEPT_ONE,
                            command: B.Commands.ACCEPT_ONE,
                            group: "lite",
                            order: 1
                        }
                    }
                    if (J.indexOf(B.Commands.REJECT_ONE) >= 0) {
                        L[B.Commands.REJECT_ONE] = {
                            label: I.REJECT_ONE,
                            command: B.Commands.REJECT_ONE,
                            group: "lite",
                            order: 2
                        }
                    }
                    O.addMenuItems(L)
                }
                if (O.contextMenu) {
                    O.contextMenu.addListener((function (T) {
                        if (T && this._tracker && this._tracker.currentChangeNode(T)) {
                            var S = {};
                            S[B.Commands.ACCEPT_ONE] = j.TRISTATE_OFF;
                            S[B.Commands.REJECT_ONE] = j.TRISTATE_OFF;
                            return S
                        } else {
                            return null
                        }
                    }).bind(this))
                }
            }
        },
        toggleTracking: function (G, H) {
            if ("boolean" === typeof H) {
                H = {
                    notify: H
                }
            }
            H = H || {};
            var N = (undefined === G) ? !this._isTracking : G,
                L = this._editor,
                M = this._editor.lang.lite,
                K = H && H.force;
            if (!N && this._isTracking && !K) {
                var I = this._tracker.countChanges({
                    verify: true
                });
                if (I) {
                    return window.alert(M.PENDING_CHANGES)
                }
            }
            this._isTracking = N;
            this._setCommandsState(this._liteCommandNames, N ? j.TRISTATE_OFF : j.TRISTATE_DISABLED);
            this._updateTrackingState();
            this.toggleShow(N, false);
            this._setCommandsState(B.Commands.TOGGLE_TRACKING, N ? j.TRISTATE_ON : j.TRISTATE_OFF);
            var J = L.ui.get(this._commandNameToUIName(B.Commands.TOGGLE_TRACKING));
            if (J) {
                this._setButtonTitle(J, N ? M.STOP_TRACKING : M.START_TRACKING)
            }
            if (H.notify !== false) {
                L.fire(B.Events.TRACKING, {
                    tracking: N,
                    lite: this
                })
            }
        },
        toggleShow: function (G, H) {
            var J = (typeof (G) === "undefined") ? (!this._isVisible) : G,
                K = this._editor.lang.lite;
            this._isVisible = J;
            if (this._isTracking) {
                this._setCommandsState(B.Commands.TOGGLE_SHOW, J ? j.TRISTATE_ON : j.TRISTATE_OFF)
            }
            this._tracker.setShowChanges(J && this._isTracking);
            var I = this._editor.ui.get(this._commandNameToUIName(B.Commands.TOGGLE_SHOW));
            if (I) {
                this._setButtonTitle(I, J ? K.HIDE_TRACKED : K.SHOW_TRACKED)
            }
            if (H !== false) {
                this._editor.fire(B.Events.SHOW_HIDE, {
                    show: J,
                    lite: this
                })
            }
        },
        isVisible: function () {
            return this._isVisible
        },
        isTracking: function () {
            return this._isTracking
        },
        acceptAll: function (G) {
            this._tracker.acceptAll(G);
            this._cleanup();
            this._editor.fire(B.Events.ACCEPT, {
                lite: this,
                options: G
            })
        },
        rejectAll: function (G) {
            this._tracker.rejectAll(G);
            this._cleanup();
            this._editor.fire(B.Events.REJECT, {
                lite: this,
                options: G
            })
        },
        setUserInfo: function (G) {
            G = G || {};
            this._config.userId = String(G.id);
            this._config.userName = G.name || "";
            if (this._tracker) {
                this._tracker.setCurrentUser({
                    id: this._config.userId,
                    name: this._config.userName
                })
            }
        },
        getUserInfo: function () {
            return this._tracker ? this._tracker.getCurrentUser() : {
                name: "",
                id: ""
            }
        },
        countChanges: function (G) {
            return (this._tracker && this._tracker.countChanges(G)) || 0
        },
        enableAcceptReject: function (G) {
            this._canAcceptReject = Boolean(G);
            this._onIceChange()
        },
        filterIceElement: function (G) {
            if (!G) {
                return true
            }
            try {
                if (G.hasClass(i.insertClass) || G.hasClass(i.deleteClass)) {
                    return false
                }
            } catch (G) {}
            return true
        },
        startNewSession: function () {
            var G = new Date();
            this._sessionId = String.fromCharCode(65 + Math.round(Math.random() * 26)) + G.getDate() + G.getDay() + G.getHours() + G.getMinutes() + G.getMilliseconds();
            if (this._tracker) {
                this._tracker.setSessionId(this._sessionId)
            }
        },
        getCleanMarkup: function (H) {
            if (null === H || undefined === H) {
                H = (this._editor && this._editor.getData()) || ""
            }
            for (var G = D.length - 1; G >= 0; --G) {
                H = H.replace(D[G].regex, D[G].replace)
            }
            return H
        },
        getCleanText: function () {
            var K = this._getDocument();
            if (!K) {
                return ""
            }
            var J = this._editor.getData(),
                G = K.createElement("DIV");
            G.innerHTML = J;
            var I = [];
            I.push("");
            var H = this._tracker.getDeleteClass();
            this._getCleanText(G, I, H);
            var L = I.join("\n");
            L = L.replace(/&nbsp(;)?/ig, " ");
            return L
        },
        acceptChange: function (G) {
            G = o(G);
            if (G && this._tracker) {
                this._tracker.acceptChange(G);
                this._cleanup();
                this._editor.fire(B.Events.ACCEPT, {
                    lite: this
                });
                this._onSelectionChanged(null)
            }
        },
        rejectChange: function (G) {
            G = o(G);
            if (G && this._tracker) {
                this._tracker.rejectChange(G);
                this._cleanup();
                this._editor.fire(B.Events.REJECT, {
                    lite: this
                });
                this._onSelectionChanged(null)
            }
        },
        getChanges: function (G) {
            return (this._tracker && this._tracker.getChanges(G)) || {}
        },
        _getCleanText: function (L, K, J) {
            var I = L.getAttribute("class");
            if (I && I.indexOf(J) >= 0) {
                return
            }
            var G;
            if (G = ((L.nodeName && L.nodeName.toUpperCase() === "BR") || ("block" === jQuery(L).css("display")))) {
                if (k.test(K[K.length - 1])) {
                    K[K.length - 1] = ""
                } else {
                    K.push("")
                }
            }
            for (var M = L.firstChild; M; M = M.nextSibling) {
                var H = M.nodeType;
                if (3 == H) {
                    K[K.length - 1] += String(M.nodeValue)
                } else {
                    if (1 == H || 9 == H || 11 == H) {
                        this._getCleanText(M, K, J)
                    }
                }
            }
            if (G) {
                K.push("")
            }
        },
        _onDomLoaded: function (H) {
            this._domLoaded = true;
            this._editor = H.editor;
            var G = this._editor.editable();
            G.attachListener(G, "mousedown", this._onMouseDown, this, null, 1);
            G.attachListener(G, "keypress", this._onKeyPress, this, null, 1);
            this._hideTooltip();
            this._onReady()
        },
        _onScriptsLoaded: function () {
            this._scriptsLoaded = true;
            this._onReady()
        },
        _loadCSS: function (L, G) {
            var I = L.getElementsByTagName("head")[0],
                H = G.cssPath,
                J = this.path;

            function K(N, O) {
                if (!N) {
                    return
                }
                var M = jQuery(I).find("#" + O);
                if (!M.length) {
                    M = L.createElement("link");
                    M.setAttribute("rel", "stylesheet");
                    M.setAttribute("type", "text/css");
                    M.setAttribute("id", O);
                    M.setAttribute("href", J + N);
                    I.appendChild(M)
                }
            }
            if (H !== false) {
                K(H || G.defaultCssPath, "__lite__css__")
            }
            if (this._config.tooltips.cssPath) {
                K(this._config.tooltips.cssPath, "__lite_tt_css__")
            }
        },
        _onReady: function () {
            if (!this._scriptsLoaded || !this._domLoaded) {
                return
            }
            setTimeout(this._afterReady.bind(this), 5)
        },
        _getBody: function () {
            try {
                return this._editor.editable().$
            } catch (G) {
                return null
            }
        },
        _getDocument: function () {
            return this._editor && this._editor.document && this._editor.document.$
        },
        _afterReady: function () {
            var N = this._editor,
                M = N.document.$,
                G = this._getBody(),
                J = this._config,
                H = (J && J.debug) || {};
            this._loadCSS(M, {
                cssPath: J.cssPath,
                defaultCssPath: "css/lite.css"
            });
            if (!this._eventsBounds) {
                this._eventsBounds = true;
                var L = this._onPaste.bind(this);
                N.on("afterCommandExec", this._onAfterCommand.bind(this));
                N.on("beforeCommandExec", this._onBeforeCommand.bind(this));
                if (this._config.handlePaste) {
                    N.on("paste", L, null, null, 1)
                }
                N.on("beforeGetData", this._onBeforeGetData.bind(this));
                N.on("beoreUndoImage", this._onBeforeGetData.bind(this));
                N.on("insertHtml", L, null, null, 1);
                N.on("insertText", L, null, null, 1);
                N.on("insertElement", L, null, null, 1);
                N.on("mode", this._onModeChange.bind(this), null, null, 1);
                N.on("readOnly", this._onReadOnly.bind(this))
            }
            if (this._tracker) {
                if (G != this._tracker.getContentElement()) {
                    this._tracker.stopTracking(true);
                    jQuery(this._tracker).unbind();
                    this._tracker = null
                }
            }
            if (this._tracker) {
                return
            }
            var I = {
                element: G,
                mergeBlocks: false,
                currentUser: {
                    id: J.userId || "",
                    name: J.userName || ""
                },
                userStyles: J.userStyles,
                changeTypes: {
                    insertType: {
                        tag: i.insertTag,
                        alias: i.insertClass,
                        action: "Inserted"
                    },
                    deleteType: {
                        tag: i.deleteTag,
                        alias: i.deleteClass,
                        action: "Deleted"
                    }
                },
                hostMethods: {
                    getHostRange: this._getHostRange.bind(this),
                    getHostRangeData: this._getHostRangeData.bind(this),
                    makeHostElement: function (O) {
                        return new j.dom.element(O)
                    },
                    getHostNode: function (O) {
                        return O && O.$
                    },
                    setHostRange: this._setHostRange.bind(this),
                    hostCopy: this._hostCopy.bind(this),
                    beforeEdit: this._beforeEdit.bind(this)
                }
            };
            if (H.log) {
                I.hostMethods.logError = b
            }
            I.tooltips = J.tooltips.show;
            if (I.tooltips) {
                var K = this._hideTooltip.bind(this);
                I.hostMethods.showTooltip = this._showTooltip.bind(this);
                I.hostMethods.hideTooltip = K;
                I.hostMethods.beforeDelete = I.hostMethods.beforeInsert = K;
                if (J.tooltips.classPath) {
                    try {
                        this._tooltipsHandler = new v[J.tooltips.classPath]();
                        I.tooltipsDelay = J.tooltips.delay
                    } catch (N) {}
                    if (!this._tooltipsHandler) {
                        b("Unable to create tooltip handler", J.tooltips.classPath)
                    } else {
                        this._tooltipsHandler.init(J.tooltips)
                    }
                }
            }
            jQuery.extend(I, i);
            this._tracker = new q.InlineChangeEditor(I);
            try {
                this._tracker.startTracking();
                this.toggleTracking(this._isTracking, false);
                this._updateTrackingState();
                jQuery(this._tracker).on("change", this._onIceChange.bind(this)).on("textChange", this._onIceTextChanged.bind(this));
                N.fire(B.Events.INIT, {
                    lite: this
                });
                this._onSelectionChanged(null);
                this._onIceChange(null)
            } catch (N) {
                b("ICE plugin init:", N)
            }
        },
        _onToggleShow: function () {
            this.toggleShow()
        },
        _onToggleTracking: function () {
            this.toggleTracking()
        },
        _onRejectAll: function () {
            this.rejectAll()
        },
        _onAcceptAll: function () {
            this.acceptAll()
        },
        _onAcceptOne: function () {
            var G = this._tracker.currentChangeNode();
            return this.acceptChange(G)
        },
        _onRejectOne: function () {
            var G = this._tracker.currentChangeNode();
            return this.rejectChange(G)
        },
        _onToggleTooltips: function () {
            this._tracker && this._tracker.toggleTooltips()
        },
        _cleanup: function () {
            var G = this._getBody(),
                H = jQuery(G).find(self.insertSelector + ":empty," + self.deleteSelector + ":empty");
            H.remove();
            this._onSelectionChanged(null)
        },
        _setButtonTitle: function (G, I) {
            var H = jQuery("#" + G._.id);
            H.attr("title", I)
        },
        _onAfterCommand: function (H) {
            var G = this._tracker && this._isTracking && H.data && H.data.name;
            if ("undo" === G || "redo" === G) {
                this._tracker.reload()
            }
        },
        _onBeforeCommand: function (H) {
            var G = this._tracker && this._tracker.isTracking() && H.data && H.data.name;
            if ("cut" === G) {
                if (n(this._editor, "copy")) {
                    this._tracker.prepareToCut()
                }
            } else {
                if ("copy" === G) {
                    if (n(this._editor, "copy")) {
                        this._tracker.prepareToCopy()
                    }
                }
            }
        },
        _onModeChange: function (G) {
            this._updateTrackingState();
            setTimeout(this._onIceChange.bind(this), 0)
        },
        _onKeyPress: function (G) {
            var H = G && G.data && G.data.getKeystroke();
            if (t(H)) {
                G.stop()
            }
        },
        _onKeyDown: function (G) {
            if (!this._tracker || !this._tracker.isTracking()) {
                return
            }
            var H = G.data.keyCode;
            if (t(H)) {
                if (this._tracker.tryToCut()) {
                    G.stop()
                }
            }
        },
        _onMouseDown: function () {
            this._hideTooltip()
        },
        _onBeforeGetData: function () {
            this._hideTooltip()
        },
        _onAfterSetData: function () {
            this._hideTooltip();
            this._processContent();
            if (this._tracker) {
                this._tracker.reload()
            }
        },
        _onReadOnly: function () {
            this._updateTrackingState()
        },
        _updateTrackingState: function () {
            if (this._tracker) {
                var G = this._isTracking && this._editor.mode === "wysiwyg" && !this._editor.readOnly;
                if (G === this._trackingState) {
                    return
                }
                this._trackingState = G;
                this._tracker.toggleChangeTracking(G);
                for (var I = this._removeBindings.length - 1; I >= 0; --I) {
                    this._removeBindings[I].removeListener()
                }
                this._removeBindings = [];
                this._tracker.unlistenToEvents();
                if (G) {
                    var J = this._onSelectionChanged.bind(this),
                        H = this._editor.editable();
                    if (l) {
                        this._tracker.listenToEvents()
                    } else {
                        this._removeBindings.push(this._editor.on("key", function (L) {
                            if (this._tracker) {
                                var K = L.data.domEvent && L.data.domEvent.$;
                                return K ? this._tracker.handleEvent(K) : true
                            }
                            return true
                        }.bind(this)))
                    }
                    this._removeBindings.push(H.on("keyup", this._onSelectionChanged.bind(this, null, false)));
                    this._removeBindings.push(H.on("click", J));
                    this._removeBindings.push(this._editor.on("selectionChange", J))
                }
            }
        },
        _onPaste: function (P) {
            if (!this._tracker || !this._isTracking || !P) {
                return true
            }
            var I = P.data || {},
                K = null,
                O = ["[data-track-changes-ignore]"].concat(this._config.ignoreSelectors || []),
                J = window.jQuery,
                H = (P.name == "insertElement") && I.$;
            if (!I) {
                return
            }
            if ("string" === typeof I) {
                I = {
                    dataValue: I,
                    type: "text"
                }
            }
            if (I.dataValue && ("html" === (I.type || I.mode))) {
                try {
                    H = jQuery(I.dataValue)
                } catch (L) {}
            }
            if ("string" === typeof I.dataValue) {
                try {
                    var N = this._editor.document.$,
                        G = N.createElement("div");
                    G.innerHTML = String(I.dataValue);
                    G = this._tracker.getCleanDOM(G);
                    if (!G.innerHTML) {
                        return true
                    }
                    K = jQuery.makeArray(G.childNodes)
                } catch (L) {
                    b("ice plugin paste:", L)
                }
            } else {
                if (H) {
                    K = [H]
                } else {
                    return true
                }
            }
            if (K && O.length) {
                K = K.filter(function (Q) {
                    return !F(J(Q), O)
                })
            }
            if (K && K.length) {
                K = m(K);
                var M = this._editor.focusManager.hasFocus;
                this._beforeInsert();
                this._tracker.insert({
                    nodes: K
                });
                this._afterInsert();
                if (M) {
                    this._editor.editable().focus()
                }
                P.stop()
            }
            return true
        },
        _setCommandsState: function (G, J) {
            if (typeof (G) === "string") {
                G = G.split(",")
            }
            for (var H = G.length - 1; H >= 0; --H) {
                var I = this._editor.getCommand(G[H]);
                if (I) {
                    I.setState(J)
                }
            }
        },
        _onSelectionChanged: function (I, G) {
            var H = this._isTracking && this._tracker && this._tracker.isInsideChange(null, null, G),
                J = H && this._canAcceptReject ? j.TRISTATE_OFF : j.TRISTATE_DISABLED;
            this._setCommandsState([B.Commands.ACCEPT_ONE, B.Commands.REJECT_ONE], J)
        },
        _onIceChange: function (I) {
            var G = this._isTracking && this._tracker && this._tracker.hasChanges();
            var H = G && this._canAcceptReject ? j.TRISTATE_OFF : j.TRISTATE_DISABLED;
            this._setCommandsState([B.Commands.ACCEPT_ALL, B.Commands.REJECT_ALL], H);
            this._onSelectionChanged();
            if (I) {
                this._triggerChange()
            }
        },
        _onIceTextChanged: function (G) {
            this._editor.fire("change");
            this._editor.fire("saveSnapshot")
        },
        _triggerChange: function () {
            if (!this._changeTimeout) {
                this._changeTimeout = setTimeout(this._notifyChange, 1)
            }
        },
        _notifyChange: function () {
            this._changeTimeout = null;
            this._editor.fire(B.Events.CHANGE, {
                lite: this
            })
        },
        _notifyTextChange: function () {
            this._changeTimeout = null;
            this._editor.fire("change", {
                lite: this
            })
        },
        _processContent: function () {
            var G = this._getBody(),
                J = g(G),
                M = i.insertTag,
                I = i.deleteTag,
                H, K;
            if (!G) {
                return
            }
            K = G.ownerDocument;

            function L(Q, N) {
                var P = Q.parentNode,
                    O = K.createElement(N);
                g.each(Q.attributes, function (S, R) {
                    O.setAttribute(R.name, R.value)
                });
                O.className = Q.className || "";
                g(Q).contents().appendTo(O);
                P.insertBefore(O, Q);
                P.removeChild(Q)
            }
            if (M !== "span") {
                H = g(G).find("span." + i.insertClass);
                H.each(function (N, O) {
                    L(O, M)
                })
            }
            if (I !== "span") {
                H = J.find("span." + i.deleteClass);
                H.each(function (N, O) {
                    L(O, I)
                })
            }
        },
        _commandNameToUIName: function (G) {
            return G.replace(".", "_")
        },
        _setPluginFeatures: function (L, N) {
            function J() {
                return [N.deleteClass, N.insertClass, N.stylePrefix + "*"]
            }

            function G() {
                var P = ["title"];
                for (var Q in N.attributes) {
                    if (N.attributes.hasOwnProperty(Q)) {
                        var R = N.attributes[Q];
                        if ((typeof R === "string") && R.indexOf("data-") === 0) {
                            P.push(R)
                        }
                    }
                }
                return P
            }

            function I(P) {
                var Q = {};
                P.forEach(function (R) {
                    Q[R] = true
                });
                return Q
            }
            if (!L || !L.filter || !L.filter.addFeature) {
                return
            }
            try {
                var H = [],
                    O, K;
                O = {};
                K = {};
                K.classes = I(J());
                K.attributes = I(G());
                O[N.insertTag] = K;
                O[N.deleteTag] = j.tools.clone(K);
                O.br = j.tools.clone(K);
                O.br.propertiesOnly = true;
                O.span = j.tools.clone(K);
                L.filter.addFeature({
                    name: "lite-features",
                    allowedContent: O
                })
            } catch (M) {
                b(M)
            }
        },
        _setHostRange: function (G) {
            var H = this._editor && this._editor.getSelection();
            if (H) {
                H.selectRanges([G])
            }
        },
        _beforeEdit: function () {
            j.iscutting = true;
            var H = this._editor,
                G = function () {
                    H.fire("saveSnapshot")
                };
            G();
            setTimeout(function () {
                j.iscutting = false
            }, 100)
        },
        _hostCopy: function () {
            try {
                if (j.env.ie) {
                    w(this._editor, "copy")
                } else {
                    this._editor.document.$.execCommand("copy", false, null)
                }
            } catch (G) {
                b(G)
            }
        },
        _getHostRange: function () {
            var I = this._editor && this._editor.getSelection(),
                G = I && I.getRanges(),
                H = G && G[0];
            return H || null
        },
        _getHostRangeData: function (G) {
            G = G || this._getHostRange();
            if (!G) {
                return null
            }
            return {
                startContainer: G.startContainer && G.startContainer.$,
                endContainer: G.endContainer && G.endContainer.$,
                startOffset: G.startOffset,
                endOffset: G.endOffset
            }
        },
        _showTooltip: function (H, J) {
            var G = this._config.tooltips;
            if (G.events) {
                return this._editor && this._editor.fire(B.Events.HOVER_IN, {
                    lite: this,
                    node: H,
                    changeId: J.changeId
                })
            }
            if (G.show) {
                var I = this._makeTooltipTitle(J);
                if (this._tooltipsHandler) {
                    this._tooltipsHandler.hideAll(this._getBody());
                    this._tooltipsHandler.showTooltip(H, I, this._editor.container.$)
                } else {
                    H.setAttribute("title", I)
                }
            }
        },
        _hideTooltip: function (I) {
            var H = this._config.tooltips;
            if (H.events) {
                return this._editor && this._editor.fire(B.Events.HOVER_OUT, {
                    lite: this,
                    node: I
                })
            }
            if (this._tooltipsHandler) {
                if (I) {
                    this._tooltipsHandler.hideTooltip(I)
                } else {
                    this._tooltipsHandler.hideAll(this._getBody())
                }
            } else {
                if (this._tracker) {
                    if (I) {
                        I.removeAttribute("title")
                    } else {
                        var G = this._tracker.getIceNodes();
                        if (G) {
                            G.removeAttr("title")
                        }
                    }
                }
            }
        },
        _beforeInsert: function () {
            this._editor.fire("saveSnapshot")
        },
        _afterInsert: function () {
            var G = this._editor;
            G.getSelection().scrollIntoView()
        },
        _makeTooltipTitle: function (K) {
            var J = this._config.tooltipTemplate || y,
                H = new Date(K.time),
                G = new Date(K.lastTime),
                I = this._editor.lang.lite;
            J = J.replace(/%a/g, "insert" === K.type ? I.CHANGE_TYPE_ADDED : I.CHANGE_TYPE_DELETED);
            J = J.replace(/%t/g, a(H, I));
            J = J.replace(/%u/g, K.userName);
            J = J.replace(/%dd/g, E(H.getDate(), 2));
            J = J.replace(/%d/g, H.getDate());
            J = J.replace(/%mm/g, E(H.getMonth() + 1, 2));
            J = J.replace(/%m/g, H.getMonth() + 1);
            J = J.replace(/%yy/g, E(H.getYear() - 100, 2));
            J = J.replace(/%y/g, H.getFullYear());
            J = J.replace(/%nn/g, E(H.getMinutes(), 2));
            J = J.replace(/%n/g, H.getMinutes());
            J = J.replace(/%hh/g, E(H.getHours(), 2));
            J = J.replace(/%h/g, H.getHours());
            J = J.replace(/%T/g, a(G, I));
            J = J.replace(/%DD/g, E(G.getDate(), 2));
            J = J.replace(/%D/g, G.getDate());
            J = J.replace(/%MM/g, E(G.getMonth() + 1, 2));
            J = J.replace(/%M/g, G.getMonth() + 1);
            J = J.replace(/%YY/g, E(G.getYear() - 100, 2));
            J = J.replace(/%Y/g, G.getFullYear());
            J = J.replace(/%NN/g, E(G.getMinutes(), 2));
            J = J.replace(/%N/g, G.getMinutes());
            J = J.replace(/%HH/g, E(G.getHours(), 2));
            J = J.replace(/%H/g, G.getHours());
            return J
        }
    };

    function b() {
        var G = window.console;
        if (G && G.error) {
            G.error.apply(G, [].slice.call(arguments))
        }
    }

    function n(G, I) {
        if (j.env.ie) {
            return w(G, I)
        }
        try {
            return G.document.$.execCommand(I, false, null)
        } catch (H) {
            return false
        }
    }

    function w(I, L) {
        var J = I.document,
            G = J.getBody(),
            H = false,
            K, M = function () {
                H = true
            };
        G.on(L, M);
        K = (j.env.version > 7 ? J.$ : J.$.selection.createRange())["execCommand"](L, false);
        G.removeListener(L, M);
        return K || H
    }
})(window.CKEDITOR, this || window);