function makeWorld() {
    function e() {
        for (var e = document.getElementsByClassName("hover"), t = 0; t < e.length; t++) e[t].classList.remove("hover");
        document.body.style.cursor = "auto";
    }
    function t() {
        for (var e = 0, n = p.length; e < n; e++) {
            for (var i = p[e], o = null, r = 0, a = b.length; r < a; r++)
                if (b[r].id == i.id) {
                    o = b[r];
                    break;
                }
            null !== o && ((i.style.transform = "translate( " + (o.position.x - i.offsetWidth / 2) + "px, " + (o.position.y - i.offsetHeight / 2) + "px )"), (i.style.transform += "rotate( " + o.angle + "rad )"));
        }
        window.requestAnimationFrame(t);
    }
    document.getElementsByTagName("main")[0].style.visibility = "visible";
    var n = {};
    (n.width = window.innerWidth), (n.height = window.innerHeight), (n.centerX = n.width / 2), (n.centerY = n.height / 2), (n.offsetX = n.width / 2), (n.offsetY = n.height / 2);
    var i = Matter.Engine,
        o = Matter.Render,
        r = Matter.Runner,
        a = Matter.Common,
        s = Matter.World,
        d = Matter.Bodies,
        l = (Matter.Body, Matter.Events),
        c = Matter.Query,
        h = Matter.MouseConstraint,
        w = Matter.Mouse,
        u = i.create(),
        m = u.world,
        f = o.create({
            engine: u,
            element: document.getElementById("debug"),
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: "transparent",
                wireframeBackground: "transparent",
                hasBounds: !1,
                enabled: !0,
                wireframes: !1,
                showSleeping: !0,
                showDebug: !1,
                showBroadphase: !1,
                showBounds: !1,
                showVelocity: !1,
                showCollisions: !1,
                showAxes: !1,
                showPositions: !1,
                showAngleIndicator: !1,
                showIds: !1,
                showShadows: !1,
            },
        });
    o.run(f);
    var g = r.create();
    r.run(g, u);
    var v = { isStatic: !0, restitution: 0.2, friction: 1 },
        y = { isStatic: !0, restitution: 0, friction: 2 };
    s.add(m, [
        d.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth + 200, 100, y),
        d.rectangle(window.innerWidth / 2, -50, window.innerWidth + 200, 100, v),
        d.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, v),
        d.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, v),
    ]);
    for (var p = document.querySelectorAll(".matter-body"), b = [], M = 0, x = p.length; M < x; M++) {
        if ((p[M].classList.contains("hot") ? ((frA = 0.1), (oY = -40)) : ((frA = 0), (oY = 0)), p[M].classList.contains("strip")))
            var W = d.rectangle(n.centerX + Math.floor((Math.random() * n.width) / 2) - n.width / 4, oY, (n.width * p[M].offsetWidth) / window.innerWidth, (n.height * p[M].offsetHeight) / window.innerHeight, {
                restitution: 0.05,
                friction: 2,
                frictionAir: frA,
                frictionStatic: 20,
                density: 100,
                chamfer: { radius: 4 },
                angle: 2 * Math.random() - 1,
            });
        else if (p[M].classList.contains("page-nav"))
            var W = d.circle(n.centerX + Math.floor((Math.random() * n.width) / 2) - n.width / 4, 0, 75, { restitution: 0.3, friction: 6, frictionAir: 0, frictionStatic: 2, density: 100, angle: 2 * Math.random() - 1 });
        else if (p[M].classList.contains("page-nav-2"))
            var W = d.circle(n.centerX + Math.floor((Math.random() * n.width) / 2) - n.width / 4, 0, 50, { restitution: 0.3, friction: 6, frictionAir: 0, frictionStatic: 2, density: 100, angle: 2 * Math.random() - 1 });
        else if (p[M].classList.contains("page-nav-3"))
            var W = d.circle(n.centerX + Math.floor((Math.random() * n.width) / 2) - n.width / 4, 0, 37.5, { restitution: 0.3, friction: 6, frictionAir: 0, frictionStatic: 2, density: 100, angle: 2 * Math.random() - 1 });
        (p[M].id = W.id), b.push(W);
    }
    s.add(u.world, b);
    var A = function (e) {
        var t = void 0 !== window.orientation ? window.orientation : 0,
            n = u.world.gravity;
        0 === t
            ? ((n.x = a.clamp(e.gamma, -90, 90) / 90), (n.y = a.clamp(e.beta, -90, 90) / 90))
            : 180 === t
            ? ((n.x = a.clamp(e.gamma, -90, 90) / 90), (n.y = a.clamp(-e.beta, -90, 90) / 90))
            : 90 === t
            ? ((n.x = a.clamp(e.beta, -90, 90) / 90), (n.y = a.clamp(-e.gamma, -90, 90) / 90))
            : -90 === t && ((n.x = a.clamp(-e.beta, -90, 90) / 90), (n.y = a.clamp(e.gamma, -90, 90) / 90));
    };
    window.addEventListener("deviceorientation", A);
    var B = w.create(f.canvas),
        H = h.create(u, { mouse: B, constraint: { stiffness: 1, render: { visible: !1 } } });
    s.add(u.world, H), (f.mouse = B);
    var E, S, L, k, I, Y;
    l.on(H, "mousemove", function (t) {
        if (((E = t.mouse.absolute.x), (S = t.mouse.absolute.y), c.point(b, { x: E, y: S }).length)) {
            e();
            var n = c.point(b, { x: E, y: S })[0].id;
            (document.getElementById(n).className += " hover"), (document.body.style.cursor = "pointer");
        } else e();
    }),
        l.on(H, "mousedown", function (e) {
            (L = e.mouse.absolute.x), (k = e.mouse.absolute.y);
        }),
        l.on(H, "mouseup", function (t) {
            if (((I = t.mouse.absolute.x), (Y = t.mouse.absolute.y), L == I && k == Y)) {
                if (c.point(b, { x: I, y: Y }).length) var n = c.point(b, { x: I, y: Y })[0].id;
                n && (window.location.href = document.getElementById(n).getAttribute("data-url"));
            }
            e();
        }),
        window.requestAnimationFrame(t);
}
function debounce(e, t, n) {
    var i;
    return function () {
        var o = this,
            r = arguments;
        clearTimeout(i),
            (i = setTimeout(function () {
                (i = null), n || e.apply(o, r);
            }, t)),
            n && !i && e.apply(o, r);
    };
}
makeWorld();
var refreshWorld = debounce(function () {
    location.reload();
}, 500);
window.addEventListener("resize", refreshWorld);
