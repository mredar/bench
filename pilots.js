var REBEL="Rebel Alliance",EMPIRE="Galactic Empire",SCUM="Scum and Villainy";

function Pilot(name) {
    var i;
    var id=PILOT_dict[name];
    for (i=0; i<PILOTS.length; i++) {
	if (PILOTS[i].name==id) {
	    return Pilotfromid(i);
	}
    }
    console.log("Could not find pilot "+name);
}
function Pilotfromid(i) {
    var p=new Unit(PILOTS[i]);
    p.id=name;
    if (!p.unique) { p.id=""+p.id+(globalid++); }
    if (p.init != undefined) p.init();
    return p;
}

var PILOTS = [
    {
        name: "Wedge Antilles",    
	done:true,
        unique: true,
	faction:"REBEL",
        unit: "X-Wing",
        skill: 9,
	init: function() {
	    var ds=Unit.prototype.getdefensestrength;
	    Unit.prototype.getdefensestrength=function(w,sh) {
		var defense=ds.call(this,w,sh);
		if (sh.name=="Wedge Antilles"&&defense>0) {
		    log("["+sh.name+"] defense reduced from "+defense+" to "+(defense-1)+" for "+this.name);
		    return defense-1; 
		}
		else return defense;
	    };
	},
        points: 29,
        upgrades: [
            "Elite",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Garven Dreis",
	done:true,
	faction:"REBEL",
        unique: true,
        unit: "X-Wing",
	removefocustoken: function() {
	    this.focus--;
	    var p=[]; 
	    var i;
	    p=this.selectnearbyunits(2,function(a,b) { return (a.team==b.team&&a!=b);});
	    this.show();
	    if (p.length>0) {
		waitingforaction=true;
		log("["+this.name+"] focus -> other friendly ship");
		this.resolveactionselection(p,function(k) {
		    log(p[k].name+"  selected by Garven");
		    p[k].addfocustoken(); 
		    document.dispatchEvent(combatreadyevent()); 
		});
	    }
	},
        skill: 6,
        points: 26,
        upgrades: [
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Red Squadron Pilot",
	done:true,
        unit: "X-Wing",
	faction:"REBEL",
        skill: 4,
        points: 23,
        upgrades: [
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Rookie Pilot",
	done:true,
        unit: "X-Wing",
	faction:"REBEL",
        skill: 2,
        points: 21,
        upgrades: [
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Biggs Darklighter",
	done:true,
        init: function() {
	    var gr=Weapon.prototype.getrangeallunits;
	    Weapon.prototype.getrangeallunits=function() {
		var r=gr.call(this);
		var newr=[];
		log("[Biggs Darklighter] is the only target");
		for (i=0; i<r.length; i++) {
		    var sh=r[i];
		    if (sh.name=="Biggs Darklighter") {
			return [sh];
		    }
		}
		return r;
	    }
	},
        unique: true,
        unit: "X-Wing",
	faction:"REBEL",
        skill: 5,
        points: 25,
        upgrades: [
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Luke Skywalker",
	done:true,
	faction:"REBEL",
	init: function() {
	    this.adddefensemodd(this,function(m,n) {
		return true;
	    }, function(m,n) {
		var f=Math.floor(m/10);
		var e=m-f*10;
		if (f>0) {
		    log("["+this.name+"] 1 <code class='xfocustoken'></code>-> 1 <code class='xevadetoken'></code>");
		    return m-9;
		} 
		return m;
	    }.bind(this),false,"focus");
	},        
        unique: true,
        unit: "X-Wing",
        skill: 8,
        points: 28,
        upgrades: [
            "Elite",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Gray Squadron Pilot",
	done:true,
	faction:"REBEL",
        unit: "Y-Wing",
        skill: 4,
        points: 20,
        upgrades: [
            "Turret",
            "Torpedo",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "'Dutch' Vander",
	done:true,
        addtarget: function(t) {
	    Unit.prototype.addtarget.call(this,t);
	    var p=[]; 
	    var i;
	    p=this.selectnearbyunits(2,function(a,b) { return a.team==b.team&&a!=b; });
	    if (p.length>0) {
		waitingforaction++;
		p.push(this);
		log("<b>["+this.name+"] select ship that may acquire target lock (self to cancel)</b>");
		this.resolveactionselection(p,function(k) {
		    waitingforaction--;
		    if (k<p.length-1) { 
			log(p[k].name+"  selected by 'Dutch' Vander");
			p[k].resolvetarget();  
		    }
		});
	    }
	},
	faction:"REBEL",
        unique: true,
        unit: "Y-Wing",
        skill: 6,
        points: 23,
        upgrades: [
            "Turret",
            "Torpedo",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Horton Salm",
	done:true,
	faction:"REBEL",
        unique: true,
        unit: "Y-Wing",
        skill: 8,
        points: 25,
	init: function() {
	    unit=this;
	    this.addattackrerolla(
		this,
		["blank"],
		function() { return 10;	},
		function(w,defender) {
		    var r=this.getrange(defender);
		    if (r>=2&&r<=3) {
			log("["+this.name+"] reroll any blank result");
			return true;
		    }
		    return false;
		}.bind(this),
		false
	    )
	},
        upgrades: [
            "Turret",
            "Torpedo",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Gold Squadron Pilot",
	done:true,
        unit: "Y-Wing",
	faction:"REBEL",
        skill: 2,
        points: 18,
        upgrades: [
            "Turret",
            "Torpedo",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Academy Pilot",
	done:true,
        unit: "TIE Fighter",
        faction:"EMPIRE",
        skill: 1,
        points: 12,
        upgrades: [],
    },
    {
        name: "Obsidian Squadron Pilot",
	done:true,
        unit: "TIE Fighter",
        faction:"EMPIRE",
        skill: 3,
        points: 13,
        upgrades: [],
    },
    {
        name: "Black Squadron Pilot",
	done:true,
        unit: "TIE Fighter",
        faction:"EMPIRE",
        skill: 4,
        points: 14,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "'Winged Gundark'",
        faction:"EMPIRE",
        init:  function() {
	    this.addattackmoda(this,function(m,n) { 
		return (this.getrange(targetunit)==1);
	    }.bind(this),function(m,n) {
		var c=Math.floor(m/10);
		var h=(m-c*10)%100;
		if (h>0) {
		    log("["+this.name+"] 1 <code class='hit'></code> -> 1 <code class='critical'></code>");
		    return m+9;
		}
		return m;
	    }.bind(this),false,"hit");
	},        
	done:true,
        unique: true,
        unit: "TIE Fighter",
        skill: 5,
        points: 15,
        upgrades: [ ],
    },
    {
        name: "'Night Beast'",
        faction:"EMPIRE",
	done:true,
        init: function () {
	    var r=this.handledifficulty;
	    this.handledifficulty=function(difficulty) {
		r.call(this,difficulty);
		if (difficulty=="GREEN") {
		    log("["+this.name+"] green maneuver -> free focus action");
		    this.addfocus();
		}
	    }.bind(this);
	},
        unique: true,
        unit: "TIE Fighter",
        skill: 5,
        points: 15,
        upgrades: [ ],
    },
    {
        name: "'Backstabber'",
        unique: true,
	done:true,
        faction:"EMPIRE",
	init: function() {
	    var gas=this.getattackstrength;
	    this.getattackstrength=function(w,sh) {
		var a=gas.call(this,w,sh);
		if (sh.gethitsector(this)>3) {
		    a=a+1;
		    log("["+this.name+"] +1 attack against "+sh.name);
		}
		return a;
	    };
	},
        unit: "TIE Fighter",
        skill: 6,
        points: 16,
        upgrades: [ ],
    },
    {
        name: "'Dark Curse'",
	done:true,
        faction:"EMPIRE",
        unique: true,
	init: function() {
	    var gart=Unit.prototype.getattackrerolltokens;
	    var cuf=Unit.prototype.canusefocus;
	    var cut=Unit.prototype.canusetarget;
	    var unit=this;
	    Unit.prototype.getattackrerolltokens=function() {
		if (targetunit==unit&&this.team!=unit.team) return "";
		return gart.call(this);
	    };
	    Unit.prototype.canusefocus=function() {
		// Am I attacking darkcurse?
		if (targetunit==unit&&this.team!=unit.team) return false;
		return cuf.call(this);
	    };
	    Unit.prototype.canusetarget=function() {
		if (targetunit==unit&&this.team!=unit.team) return false;
		return cut.call(this);
	    };
	},
        unit: "TIE Fighter",
        skill: 6,
        points: 16,
        upgrades: [ ],
    },
    {
        name: "'Mauler Mithel'",
        faction:"EMPIRE",
	done:true,
        init:  function() {
	    var g=this.getattackstrength;
	    this.getattackstrength=function(w,sh) {
		var a=g.call(this,w,sh);
		if (this.gethitrange(w,sh)==1) { 
		    log("["+this.name+"] +1 attacking "+sh.name);
		    return a+1;
		}
		return a;
	    }.bind(this);
	},
        unique: true,
        unit: "TIE Fighter",
        skill: 7,
        points: 17,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "'Howlrunner'",
        unique: true,
	done:true,
        faction:"EMPIRE",
        unit: "TIE Fighter",
        skill: 8,
	init: function() {
	    this.addattackrerolla(
		this,
		["blank","focus"],
		function() { return 1; },
		function(attacker,w,defender) {
		    // Howlrunner dead ? 
		    if (!this.dead&&attacker!=this
			&&attacker.getrange(this)==1
			&&attacker.team==this.team&&w.isprimary) {
			log("["+this.name+"] 1 attack reroll for "+attacker.name);
			return true;
		    }
		    return false;
		}.bind(this),
		true
	    )
	},
        points: 18,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Maarek Stele",
        unique: true,
        faction:"EMPIRE",
	unit: "TIE Advanced",
        skill: 7,
        points: 27,
        upgrades: [
            "Elite",
            "Missile",
        ],
    },
    {
        name: "Tempest Squadron Pilot",
        faction:"EMPIRE",
	done:true,
        unit: "TIE Advanced",
        skill: 2,
        points: 21,
        upgrades: [
            "Missile",
        ],
    },
    {
        name: "Storm Squadron Pilot",
        faction:"EMPIRE",
	done:true,
        unit: "TIE Advanced",
        skill: 4,
        points: 23,
        upgrades: [
            "Missile",
        ],
    },
    {
        name: "Darth Vader",
        faction:"EMPIRE",
        unique: true,
	done:true,
        unit: "TIE Advanced",
        skill: 9,
	timeforaction: function() {
	    if (this.nbaction==1) log("["+this.name+"] 2 actions / round");
	    return (this==activeunit&&this.hasmoved&&this.nbaction<2&&phase==ACTIVATION_PHASE);
	},
	endaction: function() {
	    this.nbaction++; this.action=-1; this.actiondone=true;
	    document.dispatchEvent(actionevent());  
	    return true;
	},
	endactivationphase:function() {
	    Unit.prototype.endactivationphase.call(this);
	    this.nbaction=0;
	},
	init: function() {
	    this.nbaction=0;
	},
        points: 29,
        upgrades: [
            "Elite",
            "Missile",
        ],
    },
    {
        name: "Alpha Squadron Pilot",
        faction:"EMPIRE",
	done:true,
        unit: "TIE Interceptor",
        skill: 1,
        points: 18,
        upgrades: [ ],
    },
    {
        name: "Avenger Squadron Pilot",
        faction:"EMPIRE",
	done:true,
        unit: "TIE Interceptor",
        skill: 3,
        points: 20,
        upgrades: [ ],
    },
    {
        name: "Saber Squadron Pilot",
        faction:"EMPIRE",
	done:true,
        unit: "TIE Interceptor",
        skill: 4,
        points: 21,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "'Fel's Wrath'",
        faction:"EMPIRE",
        unique: true,
        unit: "TIE Interceptor",
	skill: 5,
        points: 23,
        upgrades: [ ],
    },
    {
        name: "Turr Phennir",
        faction:"EMPIRE",
        unique: true,
	done:true,
        unit: "TIE Interceptor",
        skill: 7,
	endattack: function(c,h) {
	    Unit.prototype.endattack.call(this,c,h);
	    console.log("["+this.name+"] free boost or roll action");
	    var m0=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"F1").add(MR(-90,0,0)).add(MT(0,-20));
	    var m1=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"F1").add(MR(90,0,0)).add(MT(0,-20));
	    this.resolveactionmove(
		[m0,
		 m0.clone().add(MT(0,20)),
		 m0.clone().add(MT(0,40)),
		 m1.clone(),
		 m1.clone().add(MT(0,20)),
		 m1.clone().add(MT(0,40)),
		 this.m,
		 this.getpathmatrix(this.m.clone(),"F1"),
		 this.getpathmatrix(this.m.clone(),"BL1"),
		 this.getpathmatrix(this.m.clone(),"BR1")],
		function(t) {
		    waitingforaction=0;
		    this.show();
		    log("calling for next combat");
		    nextcombat();
		}.bind(this),true,false);
	},
        points: 25,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Soontir Fel",
        faction:"EMPIRE",
        unique: true,
	done:true,
        addstress: function () {
	    this.stress++;
	    log("["+this.name+"] stress -> free focus action");
	    this.addfocustoken();
	},
        unit: "TIE Interceptor",
        skill: 9,
        points: 27,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Tycho Celchu",
	faction:"REBEL",
        unique: true,
	done:true,
        updateactionlist:function() {
	    if (this.collision>0||this.ocollision.template>0||this.ocollision.overlap>-1) {
		this.actionList=["NOTHING"];
	    } else {
		this.actionList=this.ship.actionList.slice(0);
		this.actionList.push("NOTHING");
	    }
	},
        unit: "A-Wing",
        skill: 8,
        points: 26,
        upgrades: [
            "Elite",
            "Missile",
        ],
    },
    {
        name: "Arvel Crynyd",
	faction:"REBEL",
        unique: true,
	done:true,
        unit: "A-Wing",
	checkcollision: function(sh) {
	    return false;
	},
        skill: 6,
        points: 23,
        upgrades: [
            "Missile",
        ],
    },
    {
        name: "Green Squadron Pilot",
	faction:"REBEL",
	done:true,
        unit: "A-Wing",
        skill: 3,
        points: 19,
        upgrades: [
            "Elite",
            "Missile",
        ],
    },
    {
        name: "Prototype Pilot",
	faction:"REBEL",
	done:true,
        unit: "A-Wing",
        skill: 1,
        points: 17,
        upgrades: [
            "Missile",
        ],
    },
    {
        name: "Outer Rim Smuggler",
	faction:"REBEL",
        unit: "YT-1300",
	done:true,
	install: function() {
	    this.hull=6;
	    this.shield=4;
	    this.fire=2;
	},
	uninstall: function() {
	    this.hull=8;
	    this.shield=5;
	    this.fire=5;
	},
        skill: 1,
        points: 27,
        upgrades: [
            "Crew",
            "Crew",
        ],
    },
    {
        name: "Chewbacca",
        unique: true,
	faction:"REBEL",
        unit: "YT-1300",
        skill: 5,
        points: 42,
        upgrades: [
            "Elite",
            "Missile",
            "Crew",
            "Crew",
        ]
    },
    {
        name: "Lando Calrissian",
	faction:"REBEL",
        unique: true,
        unit: "YT-1300",
        skill: 7,
        points: 44,
        upgrades: [
            "Elite",
            "Missile",
            "Crew",
            "Crew",
        ],
        attack: 3,
        agility: 1,
        hull: 8,
        shields: 5,
    },
    {
        name: "Han Solo",
        unique: true,
	done:true,
	faction:"REBEL",
        unit: "YT-1300",
        skill: 9,
        points: 46,
	init: function() {
	    this.addattackrerolla(
		this,
		["blank","focus","hit","critical"],
		function() { return 10; },
		function(w,defender) {
		    return true;
		}.bind(this),
		false
	    )
	},
        upgrades: [
            "Elite",
            "Missile",
            "Crew",
            "Crew",
        ],
    },
    {
        name: "Kath Scarlet",
        unique: true,
        faction:"EMPIRE",
        unit: "Firespray-31",
        skill: 7,
	done:true,
	init: function() {
	    var cc=Unit.prototype.cancelcritical;
	    Unit.prototype.cancelcritical=function(c,h,sh) {
		var ce=cc.call(this,c,h,sh);
		if (ce>0) this.addstress();
		return ce;
	    }
	},
        points: 38,
        upgrades: [
            "Elite",
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
        ],
    },
    {
        name: "Boba Fett",
        unique: true,
	done:true,
        faction:"EMPIRE",
        completemaneuver: function(dial,realdial,difficulty) {
	    if (dial.match("BL3|BL2|BL1")) {
		var newdial=dial.replace(/L/,"R");
		this.resolveactionmove(
		    [this.getpathmatrix(this.m.clone(),realdial),
		     this.getpathmatrix(this.m.clone(),newdial)],
		    function(t,k) {
			if (k==0) Unit.prototype.completemaneuver.call(this,dial,realdial,difficulty);
			else Unit.prototype.completemaneuver.call(this,newdial,newdial,difficulty);
		    }.bind(this),false,true);
	    } else if (dial.match("BR3|BR2|BR1")) {
		var newdial=dial.replace(/R/,"L");
		this.resolveactionmove(
		    [this.getpathmatrix(this.m.clone(),dial),
		     this.getpathmatrix(this.m.clone(),newdial)],
		    function(t,k) {
			if (k==0) Unit.prototype.completemaneuver.call(this,dial,realdial,difficulty);
			else Unit.prototype.completemaneuver.call(this,dial,newdial,difficulty);
		    }.bind(this),false,true);
	    } else Unit.prototype.completemaneuver.call(this,dial,realdial,difficulty);
	},
        unit: "Firespray-31",
        skill: 8,
        points: 39,
        upgrades: [
            "Elite",
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
        ],
    },
    {
        name: "Krassis Trelix",
        unique: true,
	done:true,
        faction:"EMPIRE",
        unit: "Firespray-31",
	init: function() {
	    this.addattackrerolla(
		this,
		["blank","focus"],
		function() { return 1; },
		function(w,defender) {
		    if (!w.isprimary) {
			log("["+this.name+"] +1 reroll");
			return true;
		    }
		    return false;
		}.bind(this),
		false
	    )
	},
        skill: 5,
        points: 36,
        upgrades: [
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
        ],
    },
    {
        name: "Bounty Hunter",
        unit: "Firespray-31",
        skill: 3,
	done:true,
        faction:"EMPIRE",
        points: 33,
        upgrades: [
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
        ],
    },
    {
        name: "Ten Numb",
	faction:"REBEL",
        unique: true,
	done:true,
        unit: "B-Wing",
        skill: 8,
	init: function() {
	    var cc=Unit.prototype.cancelcritical;
	    Unit.prototype.cancelcritical=function(c,h,sh) {
		var ce=cc.call(this,c,h,sh);
		if (activeunit.name=="Ten Numb"&&c>1 && ce==0) return 1;
		return ce;
	    }
	},
        points: 31,
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Torpedo",
            "Torpedo",
        ],
    },
    {
        name: "Ibtisam",
        unique: true,
	done:true,
	faction:"REBEL",
        unit: "B-Wing",
        skill: 6,
        points: 28,
	init: function() {
	    this.addattackrerolla(
		this,
		["blank","focus"],
		function() { return 1; },
		function(w,defender) {
		    if (this.stress>0) {
			log("["+this.name+"] +1 attack reroll (stressed)");
			return true;
		    }
		    return false;
		}.bind(this),
		false
	    );
	    this.adddefensererolld(
		this,
		["blank","focus"],
		function() { return 1; },
		function(w,attacker) {
		    if (this.stress>0) {
			log("["+this.name+"] +1 defense reroll (stressed)");
			return true;
		    }
		    return false;
		}.bind(this),
		false
	    );
	},
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Torpedo",
            "Torpedo",
        ],
    },
    {
        name: "Dagger Squadron Pilot",
        unit: "B-Wing",
	done:true,
	faction:"REBEL",
        skill: 4,
        points: 24,
        upgrades: [
            "System",
            "Cannon",
            "Torpedo",
            "Torpedo",
        ],
    },
    {
        name: "Blue Squadron Pilot",
        unit: "B-Wing",
	done:true,
	faction:"REBEL",
        skill: 2,
        points: 22,
        upgrades: [
            "System",
            "Cannon",
            "Torpedo",
            "Torpedo",
        ],
    },
    {
        name: "Rebel Operative",
        unit: "HWK-290",
	done:true,
	faction:"REBEL",
        skill: 2,
        points: 16,
        upgrades: [
            "Turret",
            "Crew",
        ],
    },
    {
        name: "Roark Garnet",
        unique: true,
	faction:"REBEL",
        unit: "HWK-290",
        skill: 4,
	begincombatphase: function() {
	    if (!this.dead) {
		var p=selectnearbyunits(3,function(t,s) { return t.team==s.team&&t!=s; })
		/* TODO: should stop attack actions */
		if (p.length>0) {
		    p.push(this);
		    log("<b>["+this.name+"] select a pilot to set its skill to 12 (or "+this.name+" to cancel)</b>");
		    waitingforaction++;
		    this.resolveactionselection(p,function(k) {
			if (this!=p[k]) {
			    p[k].oldskill=p[k].skill;
			    p[k].skill=12;
			    filltabskill();
			    p[k].show();
			    log("["+this.name+"] pilot skill of 12 for "+p[k].name);
			    p[k].endcombatphase=function() {
				this.skill=this.oldskill;
				squadron.sort(function(a,b) {return b.skill-a.skill;});
				this.show();
			    }.bind(p[k]);
			}
			document.dispatchEvent(combatreadyevent()); 
		    }.bind(this))
		}
	    }
	},        
	done:true,
        points: 19,
        upgrades: [
            "Turret",
            "Crew",
        ],
    },
    {
        name: "Kyle Katarn",
	faction:"REBEL",
        unique: true,
	done:true,
        unit: "HWK-290",
        skill: 6,
        points: 21,
	begincombatphase: function() {
	    if (this.focus>0) {
		var p=selectnearbyunits(3,function(t,s) { return s.team==t.team&&s!=t; });
		if (p.length>0) {
		    waitingforaction++;
		    p.push(this);
		    log("<b>["+this.name+"] select unit to give focus token</b>");
		    this.resolveactionselection(p,function(k) {
			if (this!=p[k]) {
			    this.removefocustoken();
			    p[k].addfocustoken();
			    log("["+this.name+"] focus token given to "+p[k].name);
			}
			document.dispatchEvent(combatreadyevent()); 
		    }.bind(this));
		}
	    }
	},
        upgrades: [
            "Elite",
            "Turret",
            "Crew",
        ],
    },
    {
        name: "Jan Ors",
	faction:"REBEL",
        unique: true,
	done:true,
        unit: "HWK-290",
        skill: 8,
	init: function() {
	    var unit=this;
	    this.addattackmoda(this, function(m,n) {
		return (unit.stress==0)&&
			(activeunit.team==unit.team)&&(activeunit!=unit)
			&&(unit.getrange(activeunit)<=3);
	    }.bind(this), function(m,n) {
		var r=Math.floor(Math.random()*7);
		var f=FACE[ATTACKDICE[r]];
		unit.addstress();
		log("["+unit.name+"] +1 attack die");
		if (f=="focus") return m+100;
		if (f=="hit") return m+1;
		if (f=="critical") return m+10;
		return m;
	    }.bind(this),true,"hit");
	},
        points: 25,
        upgrades: [
            "Elite",
            "Turret",
            "Crew",
        ],
    },
    {
        name: "Scimitar Squadron Pilot",
        done:true,
        unit: "TIE Bomber",
        skill: 2,
        faction:"EMPIRE",
        points: 16,
        upgrades: [
            "Torpedo",
            "Torpedo",
            "Missile",
            "Missile",
            "Bomb",
        ],
    },
    {
        name: "Gamma Squadron Pilot",
	done:true,
        unit: "TIE Bomber",
        faction:"EMPIRE",
        skill: 4,
        points: 18,
        upgrades: [
            "Torpedo",
            "Torpedo",
            "Missile",
            "Missile",
            "Bomb",
        ],
    },
    {
        name: "Captain Jonus",
        faction:"EMPIRE",
	done:true,
        init: function() {
	    this.addattackrerolla(
		this,
		["blank","focus"],
		function() { return 2; },
		function(attacker,w,defender) {
		    // Jonus dead ? 
		    if (!this.dead&&attacker!=this
			&&attacker.getrange(this)==1
			&&attacker.team==this.team
			&&w.isprimary!=true) {
			log("["+this.name+"] 2 reroll for "+attacker.name);
			return true;
		    }
		    return false;
		}.bind(this),
		true
	    )
	},
        unique: true,
        unit: "TIE Bomber",
        skill: 6,
        points: 22,
        upgrades: [
            "Elite",
            "Torpedo",
            "Torpedo",
            "Missile",
            "Missile",
            "Bomb",
        ],
    },
    {
        name: "Major Rhymer",
	done:true,
        faction:"EMPIRE",
        init: function() {
	    for (var i=0; i<this.weapons.length; i++) {
		var r0=this.weapons[i].range[0];
		var r1=this.weapons[i].range[1];
		if (r0>1) this.weapons[i].range[0]--;
		if (r1<3) this.weapons[i].range[1]++;
	    }
	    log("["+this.name+"] extending weapon ranges");
	},
        unique: true,
        unit: "TIE Bomber",
        skill: 7,
        points: 26,
        upgrades: [
            "Elite",
            "Torpedo",
            "Torpedo",
            "Missile",
            "Missile",
            "Bomb",
        ],
    },
    {
        name: "Captain Kagi",
        faction:"EMPIRE",
        unique: true,
	done:true,
	init: function() {
	    var rt=Unit.prototype.gettargetableunits;
	    Unit.prototype.gettargetableunits=function(n) {
		var p=rt.call(this,n);
		for (var i=0; i<p.length; i++) 
		    if (p[i].name=="Captain Kagi") return [p[i]];
		return p;
	    };
	},
        unit: "Lambda-Class Shuttle",
        skill: 8,
        points: 27,
        upgrades: [
            "System",
            "Cannon",
            "Crew",
            "Crew",
        ],
    },
    {
        name: "Colonel Jendon",
        faction:"EMPIRE",
        begincombatphase: function() {
	    if (!this.dead) {
		var p=selectnearbyunits(1,function(s,t) { return s.team==t.team&&s.targeting.length==0&&s!=t; });
		if (p.length>0) {
		    p.push(this);
		    log("["+this.name+"] select a pilot to give a target lock");
		    waitingforaction++;
		    this.resolveactionselection(p,function(k) {
			if (this!=p[k]) {
			    var t=this.targeting[0];
			    p[k].addtarget(t);
			    this.removetarget(t);
			    log("["+this.name+"] "+p[k].name+" targets "+t.name);
			}
			document.dispatchEvent(combatreadyevent()); 
		    }.bind(this))
		}
	    }
	},       
	done:true,
        unique: true,
        unit: "Lambda-Class Shuttle",
        skill: 6,
        points: 26,
        upgrades: [
            "System",
            "Cannon",
            "Crew",
            "Crew",
        ],
    },
    {
        name: "Captain Yorr",
        faction:"EMPIRE",
        unique: true,
	done:true,
        unit: "Lambda-Class Shuttle",
        skill: 4,
	init: function() {
	    var as=Unit.prototype.addstress;
	    var unit=this;
	    Unit.prototype.addstress=function() {
		if (this.getrange(unit)<=2&&unit.stress<=2) {
		    unit.addstress();
		}
	    };
	},
        points: 24,
        upgrades: [
            "System",
            "Cannon",
            "Crew",
            "Crew",
        ],
    },
    {
        name: "Omicron Group Pilot",
        faction:"EMPIRE",
        done:true,
        unit: "Lambda-Class Shuttle",
        skill: 2,
        points: 21,
        upgrades: [
            "System",
            "Cannon",
            "Crew",
            "Crew",
        ],
    },
    {
        name: "Lieutenant Lorrir",
        faction:"EMPIRE",
        unique: true,
	done:true,
        unit: "TIE Interceptor",
        skill: 5,
        points: 23,
	resolveroll: function() {
	    var m0=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"F1").add(MR(-90,0,0)).add(MT(0,-20));
	    var m1=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"F1").add(MR(90,0,0)).add(MT(0,-20));
	    var m2=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"BR1").add(MR(-90,0,0)).add(MT(0,-20));
	    var m3=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"BR1").add(MR(90,0,0)).add(MT(0,-20));
	    var m4=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"BL1").add(MR(-90,0,0)).add(MT(0,-20));
	    var m5=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"BL1").add(MR(90,0,0)).add(MT(0,-20));
	    this.resolveactionmove(
		[m0.clone().add(MT(0,0)),
		 m0.clone().add(MT(0,20)),
		 m0.clone().add(MT(0,40)),
		 m1.clone().add(MT(0,0)),
		 m1.clone().add(MT(0,20)),
		 m1.clone().add(MT(0,40)),
		 m2.clone().add(MT(0,0)),
		 m2.clone().add(MT(0,20)),
		 m2.clone().add(MT(0,40)),
		 m3.clone().add(MT(0,0)),
		 m3.clone().add(MT(0,20)),
		 m3.clone().add(MT(0,40)),
		 m4.clone().add(MT(0,0)),
		 m4.clone().add(MT(0,20)),
		 m4.clone().add(MT(0,40)),
		 m5.clone().add(MT(0,0)),
		 m5.clone().add(MT(0,20)),
		 m5.clone().add(MT(0,40))],
		function(t,k) {
		    if (k>5) t.addstress();
		    t.endaction();
		},true);
	    return true;
	},

        upgrades: [ ],
    },
    {
        name: "Royal Guard Pilot",
        faction:"EMPIRE",
        done:true,
        unit: "TIE Interceptor",
        skill: 6,
        points: 22,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Tetran Cowall",
        faction:"EMPIRE",
        unique: true,
	done:true,
        completemaneuver: function(dial,realdial,difficulty) {
	    if (dial.match("K5|K3")) {
		this.resolveactionmove(
		    [this.getpathmatrix(this.m.clone(),"K1"),
		     this.getpathmatrix(this.m.clone(),"K3"),
		     this.getpathmatrix(this.m.clone(),"K5")],
		    function(t,k) {
			var m="K5";
			if (k==0) m="K1";
			if (k==1) m="K3";
			Unit.prototype.completemaneuver.call(t,dial,m,difficulty);
		    },false,true);
	    } else Unit.prototype.completemaneuver.call(this,dial,realdial,difficulty);
	},
        unit: "TIE Interceptor",
        skill: 7,
        points: 24,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Kir Kanos",
        faction:"EMPIRE",
        useevade:  function() {
	    var ue=Unit.prototype.useevade;
	    var r=this.getrange(targetunit);
	    ue.call(this);
	    if (phase==COMBAT_PHASE&&this.canuseevade()&&this==activeunit&&r<=3&&r>=2) {
		this.removeevadetoken();
		$("atokens .xevadetoken").remove();
		$("#attack").append("<b class='hitreddice'></b>");
		log("["+this.name+"] +1 <code class='hit'></code> for attacking at range 2-3");
	    }
	},   
	done:true,
        unique: true,
        unit: "TIE Interceptor",
        skill: 6,
        points: 24,
        upgrades: [ ],
    },
    {
        name: "Carnor Jax",
        faction:"EMPIRE",
        init: function() {
	    var cuf=Unit.prototype.canusefocus;
	    var cue=Unit.prototype.canuseevade;
	    var cdf=Unit.prototype.candofocus;
	    var cde=Unit.prototype.candoevade;
	    var unit=this;
	    Unit.prototype.canusefocus=function() {
		if (this.getrange(unit)==1&&this.team!=unit.team) return false;
		return cuf.call(this);
	    };
	    Unit.prototype.canuseevade=function() {
		// Am I attacking Carnor Jax?
		if (this.getrange(unit)==1&&this.team!=unit.team) return false;
		return cue.call(this);
	    };
	    Unit.prototype.candofocus=function() {
		if (this.getrange(unit)==1&&this.team!=unit.team) return false;
		return cdf.call(this);
	    }
	    Unit.prototype.candoevade=function() {
		if (this.getrange(unit)==1&&this.team!=unit.team) return false;
		return cde.call(this);
	    }
	},
        unique: true,
	done:true,
        unit: "TIE Interceptor",
        skill: 8,
        points: 26,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Bandit Squadron Pilot",
	faction:"REBEL",
        done:true,
        unit: "Z-95 Headhunter",
        skill: 2,
        points: 12,
        upgrades: [
            "Missile",
        ],
    },
    {
        name: "Tala Squadron Pilot",
	faction:"REBEL",
        done:true,
        unit: "Z-95 Headhunter",
        skill: 4,
        points: 13,
        upgrades: [
            "Missile",
        ],
    },
    {
        name: "Lieutenant Blount",
	faction:"REBEL",
        done:true,
	endattack: function(c,h) {
	    if (c+h==0) {
		log("["+this.name+"] target is hit");
		targetunit.ishit();
	    }
	    Unit.prototype.endattack.call(this,c,h);
	},
        unique: true,
        unit: "Z-95 Headhunter",
        skill: 6,
        points: 17,
        upgrades: [
            "Elite",
            "Missile",
        ],
    },
    {
        name: "Airen Cracken",
	faction:"REBEL",
	done:true,
        endattack: function() {
	    var i;
	    var p=this.selectnearbyunits(1,function(t,s) { return (t.team==s.team)&&(s!=t); });
	    if (p.length>0) {
		log("<b>["+this.name+"] select unit for a free action");
		waitingforaction++;
		this.resolveactionselection(p,function(k) {
		    p[k].freeaction(function() { document.dispatchEvent(combatreadyevent()); });
		});
	    }
	},
        unique: true,
        unit: "Z-95 Headhunter",
        skill: 8,
        points: 19,
        upgrades: [
            "Elite",
            "Missile",
        ],
    },
    {
        name: "Delta Squadron Pilot",
        faction:"EMPIRE",
        done:true,
        
        unit: "TIE Defender",
        skill: 1,
        points: 30,
        upgrades: [
            "Cannon",
            "Missile",
        ],
    },
    {
        name: "Onyx Squadron Pilot",
        done:true,
        faction:"EMPIRE",
        
        unit: "TIE Defender",
        skill: 3,
        points: 32,
        upgrades: [
            "Cannon",
            "Missile",
        ],
    },
    {
        name: "Colonel Vessery",
        done:true,
        faction:"EMPIRE",
        attackroll:function(n) {
	    var ar=Unit.prototype.ar;
	    var r=ar.call(this);
	    if (targetunit.istargeted&&this.target==0) {
		this.addtarget(targetunit);
		log("["+this.name+"] lock target "+targetunit.name);	
	    }
	    return r;
	},
        unique: true,
        unit: "TIE Defender",
        skill: 6,
        points: 35,
        upgrades: [
            "Elite",
            "Cannon",
            "Missile",
        ],
    },
    {
        name: "Rexler Brath",
        
        faction:"EMPIRE",
        
        unique: true,
        unit: "TIE Defender",
        skill: 8,
        points: 37,
        upgrades: [
            "Elite",
            "Cannon",
            "Missile",
        ],
    },
    {
        name: "Knave Squadron Pilot",
        
	faction:"REBEL",
        done:true,
        unit: "E-Wing",
        skill: 1,
        points: 27,
        upgrades: [
            "System",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Blackmoon Squadron Pilot",
        
	faction:"REBEL",
        done:true,
        unit: "E-Wing",
        skill: 3,
        points: 29,
        upgrades: [
            "System",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Etahn A'baht",
	done:true,
	faction:"REBEL",
        init:  function() {
	    var unit=this;
	    this.addattackmoda(this, function(m,n) {
		return (targetunit.team!=unit.team)
		    &&unit.isinsector(unit.m,3,targetunit);
	    }.bind(this), function(m,n) {
		var c=Math.floor(m/10);
		var h=(m-c*10)%100;
		if (h>0) {
		    log("["+unit.name+"] 1 <code class='hit'></code>-> 1 <code class='critical'></code>");
		    return m+9;
		} 
		return m;
	    }.bind(this),true,"hit");
	},        

        
        unique: true,
        unit: "E-Wing",
        skill: 5,
        points: 32,
        upgrades: [
            "Elite",
            "System",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Corran Horn",
        
	faction:"REBEL",
	done:true,
        endcombatphase: function() {
	    if (typeof this.hasdoubledfired=="undefined") this.hasdoubledfired=0;
	    if (this.hasdoubledfired==0) {
		Unit.prototype.endcombatphase.call(this);
		this.waitingforaction=0;
		var old=activeunit;
		var oldskill=this.skill;
		activeunit=this;
		this.hasfired=0;
		this.hasdoubledfired=round;
		this.skill=-1;
		this.select();
		old.unselect();
		log("["+this.name+"] New attack possible (no attack next turn)");
		this.showattack();
		this.skill=oldskill;
		this.showstats();
	    }
	    if (this.hasdoubledfired==round-1) {
		this.hasfired=0;
		this.hasdoubledfired=0;
		log("["+this.name+"] can fire next turn.");
	    }
	},
        unique: true,
        unit: "E-Wing",
        skill: 8,
        points: 35,
        upgrades: [
            "Elite",
            "System",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Sigma Squadron Pilot",
        faction:"EMPIRE",
        done:true,
        
        unit: "TIE Phantom",
        skill: 3,
        points: 25,
        upgrades: [
            "System",
            "Crew",
        ],
    },
    {
        name: "Shadow Squadron Pilot",
        done:true,
        faction:"EMPIRE",
        
        unit: "TIE Phantom",
        skill: 5,
        points: 27,
        upgrades: [
            "System",
            "Crew",
        ],
    },
    {
        name: "'Echo'",
        faction:"EMPIRE",
	done:true,
	resolveuncloak: function() {
	    var m0=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"F2").add(MR(-90,0,0)).add(MT(0,-20));
	    var m1=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"F2").add(MR(90,0,0)).add(MT(0,20));
	    var m2=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"BL2").add(MR(-90,0,0)).add(MT(0,-20));
	    var m3=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"BL2").add(MR(90,0,0)).add(MT(0,20));
	    var m4=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"BR2").add(MR(-90,0,0)).add(MT(0,-20));
	    var m5=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"BR2").add(MR(90,0,0)).add(MT(0,20));
	    var m6=this.getpathmatrix(this.m.clone(),"F2");
	    this.resolveactionmove(
		[m0.clone().add(MT(0,0)),
		 m0.clone().add(MT(0,20)),
		 m0.clone().add(MT(0,40)),
		 m6,
		 m1.clone().add(MT(0,0)),
		 m1.clone().add(MT(0,-20)),
		 m1.clone().add(MT(0,-40)),
		 m2.clone().add(MT(0,0)),
		 m2.clone().add(MT(0,20)),
		 m2.clone().add(MT(0,40)),
		 m3.clone().add(MT(0,0)),
		 m3.clone().add(MT(0,20)),
		 m3.clone().add(MT(0,40)),
		 m4.clone().add(MT(0,0)),
		 m4.clone().add(MT(0,20)),
		 m4.clone().add(MT(0,40)),
		 m5.clone().add(MT(0,0)),
		 m5.clone().add(MT(0,20)),
		 m5.clone().add(MT(0,40)),
		],
		function (t,k) {
		    t.agility-=2; t.iscloaked=false;t.show(); 
		    waitingforaction=false;
		    SOUNDS.uncloak.play();
		},true);
	    return true;
	},          
        unique: true,
        unit: "TIE Phantom",
        skill: 6,
        points: 30,
        upgrades: [
            "Elite",
            "System",
            "Crew",
        ],
    },
    {
        name: "'Whisper'",
        faction:"EMPIRE",
	done:true,
	resolvedamage:function() {
	    var ch=targetunit.evadeattack(this);
	    Unit.prototype.resolvedamage.call(this);
	    if (ch.c+ch.h>0) {
		log("["+this.name+"] +1 focus token when hitting "+targetunit.name);
		this.addfocustoken();
	    }
	},
        unique: true,
        unit: "TIE Phantom",
        skill: 7,
        points: 32,
        upgrades: [
            "Elite",
            "System",
            "Crew",
        ],
    },
    {
        name: "Wes Janson",
	done:true,
	endattack:function(c,h) {
	    Unit.prototype.endattack.call(this,c,h);
	    if (targetunit.target+targetunit.focus+targetunit.evade>0)
		log("["+this.name+"] removing token from "+targetunit.name);
	    if (targetunit.targeting.length>0) targetunit.removetarget(targetunit.targeting[0]);
	    else if (targetunit.focus>0) targetunit.removefocustoken();
	    else if (targetunit.evade>0) targetunit.removeevadetoken();
	    Unit.prototype.endcombatphase.call(this);
	},
	faction:"REBEL",
        unique: true,
        unit: "X-Wing",
        skill: 8,
        points: 29,
        upgrades: [
            "Elite",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Jek Porkins",
	done:true,
	addstress:function() {
	    // Automatic removal of stress
	    var r=Math.floor(Math.random()*7);
	    var roll=FACE[ATTACKDICE[r]];
	    log("["+this.name+"] remove 1 stress token, roll 1 attack dice")
	    if (roll=="hit") { this.resolvehit(1); this.checkdead(); }
	},
	faction:"REBEL",
        unique: true,
        unit: "X-Wing",
        skill: 7,
        points: 26,
        upgrades: [
            "Elite",
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "'Hobbie' Klivian",
	faction:"REBEL",
	done:true,
        removetarget: function(t) {
	    if (this.stress) { 	    
		log("["+this.name+"] using target -> removes a stress token");
		this.removestresstoken();
	    }
	    Unit.prototype.removetarget.call(this,t);
	},
        addtarget: function(t) {
	    if (this.stress) { 
		this.removestresstoken();
		log("["+this.name+"] targeting -> removes a stress token");
	    }
	    Unit.prototype.addtarget.call(this,t);
	},
        unique: true,
        unit: "X-Wing",
        skill: 5,
        points: 25,
        upgrades: [
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Tarn Mison",
	done:true,
        isattackedby: function(w,a) {
	    if (this.target==0||this.skill<a.skill) { // Priority to define
		log("["+this.name+"] free target token on "+a.name);
		this.addtarget(a);
	    }
	},
	faction:"REBEL",
        
        unique: true,
        unit: "X-Wing",
        skill: 3,
        points: 23,
        upgrades: [
            "Torpedo",
            "Astromech",
        ],
    },
    {
        name: "Jake Farrell",
       	faction:"REBEL",
	done:true,
        freemove: function() {
	    log("["+this.name+"] free boost or roll action");
	    var m0=this.getpathmatrix(this.m.clone().add(MR(90,0,0)).add(MT(0,(this.islarge?-20:0))),"F1").add(MR(-90,0,0)).add(MT(0,-20));
	    var m1=this.getpathmatrix(this.m.clone().add(MR(-90,0,0)).add(MT(0,(this.islarge?-20:0))),"F1").add(MR(90,0,0)).add(MT(0,-20));
	    this.resolveactionmove(
		[m0.clone().add(MT(0,0)),
		 m0.clone().add(MT(0,20)),
		 m0.clone().add(MT(0,40)),
		 m1.clone().add(MT(0,0)),
		 m1.clone().add(MT(0,20)),
		 m1.clone().add(MT(0,40)),
		 this.m,
		 this.getpathmatrix(this.m.clone(),"F1"),
		 this.getpathmatrix(this.m.clone(),"BL1"),
		 this.getpathmatrix(this.m.clone(),"BR1")],
		function(t) {
		},true);
	},
	addfocustoken: function() {
	    Unit.prototype.addfocustoken.call(this);
	    this.freemove();
	},
	removefocustoken: function() {
	    Unit.prototype.removefocustoken.call(this);
	    this.freemove();
	},
        unique: true,
        unit: "A-Wing",
        skill: 7,
        points: 24,
        upgrades: [
            "Elite",
            "Missile",
        ],
    },
    {
        name: "Gemmer Sojan",
	done:true,
        getdefensestrength: function(w,sh) {
	    var d=Unit.prototype.getdefensestrength.call(this,w,sh);
	    var r=this.getrangeallunits();
	    var i;
	    for (i=0; i<r[1].length; i++) {
		if (squadron[r[1][i].unit].team!=this.team) {
		    log("["+this.name+"] +1 defense due to ennemy at range 1");
		    return d+1;
		}
	    }
	    return d;
	},
	faction:"REBEL",
        unique: true,
        unit: "A-Wing",
        skill: 5,
        points: 22,
        upgrades: [
            "Missile",
        ],
    },
    {
        name: "Keyan Farlander",
	faction:"REBEL",
	done:true,
	
        usestress: function() {
	    if (phase==COMBAT_PHASE&&this.hasfired>0&&this==activeunit) {
		if (this==activeunit&&this.stress>0) {
		    this.removestresstoken();
		    var l=$(".focusreddice").length;
		    $(".focusreddice").remove();
		    for (i=0; i<l; i++) { 	
			$("#attack").append("<b class='hitreddice'></b>");
		    }
		    log("["+this.name+"] focus -> hit due to stress");
		    $("#atokens .xstresstoken").remove();
		} 
	    }
	},
        unique: true,
        unit: "B-Wing",
        skill: 7,
        points: 29,
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Torpedo",
            "Torpedo",
        ],
    },
    {
        name: "Nera Dantels",
	faction:"REBEL",
	done:true,
        isTurret: function(w) {
	    if (w.type=="Torpedo") {
		log("["+this.name+"] can fire torpedos at 360 degrees");
		return true;
	    }
	    return false;
	},
        unique: true,
        unit: "B-Wing",
        skill: 5,
        points: 26,
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Torpedo",
            "Torpedo",
        ],
    },

    {
        name: "Wild Space Fringer",
        done:true,
	faction:"REBEL",
        
        unit: "YT-2400",
        skill: 2,
        points: 30,
        upgrades: [
            "Cannon",
            "Missile",
            "Crew",
        ],
    },
    {
        name: "Eaden Vrill",
	done:true,
        init:  function() {
	    var g=this.getattackstrength;
	    this.getattackstrength=function(w,sh) {
		var a=g.call(this,w,sh);
		if (sh.stress>0&&this.weapons[w].isprimary) { 
		    log("["+this.name+"] +1 attacking "+sh.name);
		    return a+1;
		}
		return a;
	    }.bind(this);
	},
        
	faction:"REBEL",
        
        unit: "YT-2400",
        unique: true,
        skill: 3,
        points: 32,
        upgrades: [
            "Cannon",
            "Missile",
            "Crew",
        ],
    },
    {
        name: "'Leebo'",
        
	faction:"REBEL",
        
        unit: "YT-2400",
        unique: true,
        skill: 5,
        points: 34,
        upgrades: [
            "Elite",
            "Cannon",
            "Missile",
            "Crew",
        ],
    },
    {
        name: "Dash Rendar",
	faction:"REBEL",
        unit: "YT-2400",
        unique: true,
        skill: 7,
	done:true,
	isintersecting: function(o1,o2) {
	    if (o1.obstacle==true&&phase==ACTIVATION_PHASE) {
		log("["+this.name+"] ignores obstacles");
		return false;
	    }
	    return Unit.prototype.isintersecting.call(this,o1,o2);
	},
        points: 36,
        upgrades: [
            "Elite",
            "Cannon",
            "Missile",
            "Crew",
        ],
    },
    {
        name: "Patrol Leader",
        
        faction:"EMPIRE",
	done:true,
        unit: "VT-49 Decimator",
        skill: 3,
        points: 40,
        upgrades: [
            "Torpedo",
            "Crew",
            "Crew",
            "Crew",
            "Bomb",
        ],
    },
    {
        name: "Captain Oicunn",
        faction:"EMPIRE",
        unit: "VT-49 Decimator",
        skill: 4,
        points: 42,
        unique: true,
        upgrades: [
            "Elite",
            "Torpedo",
            "Crew",
            "Crew",
            "Crew",
            "Bomb",
        ],
    },
    {
        name: "Commander Kenkirk",
        faction:"EMPIRE",
        getagility: function() {
	    if (this.shield==0&&this.hull<this.ship.hull) return this.agility+1;
	    return this.agility;
	},
	done:true,
        unit: "VT-49 Decimator",
        skill: 6,
        points: 44,
        unique: true,
        upgrades: [
            "Elite",
            "Torpedo",
            "Crew",
            "Crew",
            "Crew",
            "Bomb",
        ],
    },
    {
        name: "Rear Admiral Chiraneau",
        init:  function() {
	    this.addattackmoda(this,function(m,n) {
		return  (this.getrange(targetunit)<=2);
	    }.bind(this),function(m,n) {
		var c=Math.floor(m/10);
		var h=(m-c*10)%100;
		if (h>0) {
		    log("["+this.name+"] 1 <code class='hit'></code> -> 1 <code class='critical'></code>");
		    return m+9;
		}
		return m;
	    }.bind(this),false,"hit");
	},        

        faction:"EMPIRE",
        unit: "VT-49 Decimator",
        skill: 8,
        points: 46,
	done:true,
        unique: true,
        upgrades: [
            "Elite",
            "Torpedo",
            "Crew",
            "Crew",
            "Crew",
            "Bomb",
        ],
    },
    {
        name: "Prince Xizor",
        faction:"SCUM",
        modifydamageassigned: function(ch,attacker) {
	    var i;
	    var p=[];
	    if (ch==0) return 0;
	    var p=this.selectnearbyunits(1,function(t,s) { return t.team==s.team&&t!=s; })
	    if (p.length>0) {
		p.sort(function(a,b) { 
		    hpa=a.hull+a.shield; hpb=b.hull+b.shield;
		    if (hpa<hpb) return 1; 
		    if (hpa>hpb) return -1; 
		    return 0; });
		if (ch>=10) {
		    p[0].resolvecritical(1);
		    log("["+this.name+"] transferred 1 critical to "+p[0].name);
		    return ch-10;
		} 
		p[0].resolvehit(1);
		p[0].checkdead();
		log("["+this.name+"] transferred 1 hit to "+p[0].name);
		return ch-1;
	    }
	    return ch;
	},
        unique: true,
	done:true,
        unit: "StarViper",
        skill: 7,
        points: 31,
        upgrades: [
            "Elite",
            "Torpedo",
        ],
    },
    {
        name: "Guri",
        faction:"SCUM",
	/* TODO : may only do the action */
	init: function() {
	    var bgp=this.begincombatphase;
	    this.begincombatphase= function() {
		bgp.call(this);
		if (!this.dead) {
		    var p=this.gettargetableunits(1);
		    var i;
		    if (p.length>0) {
			log("["+this.name+"] +1 focus, ennemy at range 1");
			this.addfocustoken();
		    }
		}
	    }
	},       
	done:true,
        unique: true,
        unit: "StarViper",
        skill: 5,
        points: 30,
        upgrades: [
            "Elite",
            "Torpedo",
        ],
    },
    {
        name: "Black Sun Vigo",
        faction:"SCUM",
        done:true,
        unit: "StarViper",
        skill: 3,
        points: 27,
        upgrades: [
            "Torpedo",
        ],
    },
    {
        name: "Black Sun Enforcer",
        faction:"SCUM",
        done:true,
        
        unit: "StarViper",
        skill: 1,
        points: 25,
        upgrades: [
            "Torpedo",
        ],
    },
    {
        name: "Serissu",
        faction:"SCUM",
	done:true,
        init: function() {
	    this.adddefensererolld(
		this,
		["blank","focus"],
		function() { return 1 },
		function(attacker,w,defender) {
		    // Serissu dead ? 
		    if (this.dead) return false;
		    if (defender!=this&&defender.getrange(this)==1&&defender.team==this.team) {
			log("["+this.name+"] 1 reroll for "+defender.name);
			return true;
		    }
		    return false;
		}.bind(this),
		true
	    )
	},
        unit: "M3-A Interceptor",
        skill: 8,
        points: 20,
        unique: true,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Laetin A'shera",
        faction:"SCUM",
        endbeingattacked: function(c,h) {
	    Unit.prototype.endbeingattacked.call(this,c,h);
	    if (c+h>0) this.addevade();
	},        
	done:true,
        unit: "M3-A Interceptor",
        skill: 6,
        points: 18,
        unique: true,
        upgrades: [ ],
    },
    {
        name: "Tansarii Point Veteran",
        faction:"SCUM",
        done:true,
        unit: "M3-A Interceptor",
        skill: 5,
        points: 17,
        upgrades: [
            "Elite",
        ],
    },
    {
        name: "Cartel Spacer",
        faction:"SCUM",
        done:true,
        unit: "M3-A Interceptor",
        skill: 2,
        points: 14,
        upgrades: [ ],
    },
    {
        name: "IG-88A",
	faction:"SCUM",
        unique: true,
        unit: "Aggressor",
        skill: 6,
        points: 36,
	endattack: function(c,h) {
	    Unit.prototype.endattack.call(this,c,h);
	    if (targetunit.hull<=0&&this.shield<unitlist[this.ship.name]) this.shield++;
	},
	done:true,
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Cannon",
            "Bomb",
            "Illicit",
        ],
    },
    {
        name: "IG-88B",
	faction:"SCUM",
        
        
        unique: true,
        unit: "Aggressor",
        skill: 6,
        points: 36,
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Cannon",
            "Bomb",
            "Illicit",
        ],
    },
    {
        name: "IG-88C",
	faction:"SCUM",
        resolveboost: function() {
	    Unit.prototype.resolveboost.call(this);
	    this.addevade();
	},
        done:true,
        unique: true,
        unit: "Aggressor",
        skill: 6,
        points: 36,
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Cannon",
            "Bomb",
            "Illicit",
        ],
    },
    {
        name: "IG-88D",
	faction:"SCUM",  
        completemaneuver: function(dial,realdial,difficulty) {
	    if (dial=="SL3") {
		this.resolveactionmove(
		    [this.getpathmatrix(this.m.clone(),"SL3"),
		     this.getpathmatrix(this.m.clone(),"TL3")],
		    function(t,k) {
			if (k==0) Unit.prototype.completemaneuver.call(this,dial,realdial,difficulty);
			else Unit.prototype.completemaneuver.call(this,dial,"TL3",difficulty);
		    }.bind(this),false,true);
	    } else if (dial=="SR3") {
		this.resolveactionmove(
		    [this.getpathmatrix(this.m.clone(),"SR3"),
		     this.getpathmatrix(this.m.clone(),"TR3")],
		    function(t,k) {
			if (k==0) Unit.prototype.completemaneuver.call(this,dial,realpath,difficulty);
			else Unit.prototype.completemaneuver.call(this,dial,"TR3",difficulty);
		    }.bind(this),false,true);
	    } else Unit.prototype.completemaneuver.call(this,dial,realdial,difficulty);
	},
        unique: true,
	done:true,
        unit: "Aggressor",
        skill: 6,
        points: 36,
        upgrades: [
            "Elite",
            "System",
            "Cannon",
            "Cannon",
            "Bomb",
            "Illicit",
        ],
    },
    {
        name: "N'Dru Suhlak",
        unique: true,
	done:true,
	faction:"SCUM",
        init:  function() {
	    var g=this.getattackstrength;
	    this.getattackstrength=function(w,sh) {
		var a=g.call(this,w,sh);
		var r=this.getrangeallunits();
		for (var i=0; i<squadron.length; i++) 
		    if (squadron[i].getrange(this)<=2
			&&squadron[i].team==this.team) return a;
		log("["+this.name+"] +1 attacking "+sh.name+" at range >=3 of friendly ships");
		return a+1;
	    }.bind(this);
	},
        unit: "Z-95 Headhunter",
        skill: 7,
        points: 17,
        upgrades: [
            "Elite",
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Kaa'To Leeachos",
        unique: true,
	faction:"SCUM",
	done:true,
        begincombatphase: function() {
	    if (!this.dead) {
		var p;
		var i;
		p=this.selectnearbyunits(2,function(a,b) {return a.team==b.team&&a!=b&&a.canuseevade(); });
		/* TODO: should be an option */
		if (p.length>0) {
		    p.push(this)
		    log("["+this.name+"] select a focus/evade token to take");
		    waitingforaction++;
		    this.resolveactionselection(p,function(k) {
			if (this!=p[k]) { 
			    if (p[k].evade>0) { 
				p[k].removeevadetoken(); this.addevade(); 
				log("["+this.name+"] evade taken from "+p[k].name);
			    } else if (p[k].focus>0) { 
				p[k].removefocustoken(); this.addfocustoken(); 
				log("["+this.name+"] focus taken from "+p[k].name);
			    }
			}
			document.dispatchEvent(combatreadyevent()); 			
		    }.bind(this))
		}
	    }
	},    
        unit: "Z-95 Headhunter",
        skill: 5,
        points: 15,
        upgrades: [
            "Elite",
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Black Sun Soldier",
        faction:"SCUM",
        done:true,
        unit: "Z-95 Headhunter",
        skill: 3,
        points: 13,
        upgrades: [
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Binayre Pirate",
	faction:"SCUM",
        done:true,        
        unit: "Z-95 Headhunter",
        skill: 1,
        points: 12,
        upgrades: [
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Boba Fett",
	faction:"SCUM",
        unit: "Firespray-31",
        skill: 8,
        points: 39,
	init: function() {
	    var nrerolls=function() {
		var n=0;
		for (var i=0; i<squadron.length; i++) {
		    var s=squadron[i];
		    if (this.getrange(s)==1&&this.team!=s.team) n++;
		}
		return n;
	    }.bind(this);
	    this.addattackrerolla(this,
				  ["blank","focus"],
				  nrerolls, 
				  function(w,defender) { return true; },
				  false
				 );
	    this.adddefensererolld(this,
				   ["blank","focus"], 
				   nrerolls, 
				   function(w,defender) { return true; },
				   false
				  );
	},
	done:true,
        unique: true,
        upgrades: [
            "Elite",
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Kath Scarlet",
	done:true,
        init:  function() {
	    var g=this.getattackstrength;
	    this.getattackstrength=function(w,sh) {
		var a=g.call(this,w,sh);
		var m=this.m.clone();
		this.m.add(MR(180,0,0));
		if (this.gethitsector(sh)<=3) { 
		    log("["+this.name+"] +1 attacking "+sh.name+" in auxiliary arc");
		    a=a+1;
		}
		this.m=m;
		return a;
	    }.bind(this);
	},
        unique: true,
	faction:"SCUM",      
        unit: "Firespray-31",
        skill: 7,
        points: 38,
        upgrades: [
            "Elite",
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Emon Azzameen",
	done:true,
	unique:true,
	init:function() {
	    var d=Bomb.prototype.drop;
	    var unit=this;
	    Bomb.prototype.drop=function(m) {
		if (this.unit==unit) {
		    this.resolveactionmove([
			unit.getpathmatrix(unit.m.clone().add(MR(180,0,0)),"BL3"),
			unit.getpathmatrix(unit.m.clone().add(MR(180,0,0)),"BR3"),
			unit.getpathmatrix(unit.m.clone().add(MR(180,0,0)),"F3")
			],
			function(k) { d.call(this,this.m); }.bind(this));
		} else d.call(this,m);
	    };
	},
	faction:"SCUM",
        unit: "Firespray-31",
        skill: 6,
        points: 36,
        upgrades: [
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Mandalorian Mercenary",
	faction:"SCUM",       
        done:true,
        unit: "Firespray-31",
        skill: 5,
        points: 35,
        upgrades: [
            "Elite",
            "Cannon",
            "Bomb",
            "Crew",
            "Missile",
            "Illicit",
        ],
    },
    {
        name: "Kavil",
        unique: true,
	done:true,
        init:  function() {
	    var g=this.getattackstrength;
	    this.getattackstrength=function(w,sh) {
		var a=g.call(this,w,sh);
		if (this.gethitsector(sh)>3) { 
		    log("["+this.name+"] +1 attacking "+sh.name+" outside firing arc");
		    return a+1;
		}
		return a;
	    }.bind(this);
	},       
	faction:"SCUM",     
        unit: "Y-Wing",
        skill: 7,
        points: 24,
        upgrades: [
            "Elite",
            "Turret",
            "Torpedo",
            "Torpedo",
            "Salvaged",
        ],
    },
    {
        name: "Drea Renthal",
        unique: true,
	faction:"SCUM",
        unit: "Y-Wing",
        skill: 5,
	done:true,
	removetarget: function(t) {
	    Unit.prototype.removetarget.call(this,t);
	    waitingforaction++;
	    var p=[];
	    p=this.gettargetableunits(3);
	    p.push(this);
	    log("<b>["+this.name+"] select new target to lock at the cost of 1 stress (or self to cancel)</b>");
	    this.resolveactionselection(p,function(k) { 
		if (k<p.length-1) { 
		    this.addtarget(p[k]);
		    this.addstress();
		}
		waitingforaction--;
	    }.bind(this));
	},
        points: 22,
        upgrades: [
            "Turret",
            "Torpedo",
            "Torpedo",
            "Salvaged",
        ],
    },
    {
        name: "Hired Gun",
	faction:"SCUM",
	done:true,
        unit: "Y-Wing",
        skill: 4,
        points: 20,
        upgrades: [
            "Turret",
            "Torpedo",
            "Torpedo",
            "Salvaged",
        ],
    },
    {
        name: "Syndicate Thug",
	faction:"SCUM",
	done:true,
        unit: "Y-Wing",
        skill: 2,
        points: 18,
        upgrades: [
            "Turret",
            "Torpedo",
            "Torpedo",
            "Salvaged",
        ],
    },
    {
        name: "Dace Bonearm",
        unique: true,
	faction:"SCUM",
        unit: "HWK-290",
	done:true,
	init: function() {
	    var unit=this;
	    var ai=Unit.prototype.addiontoken;
	    Unit.prototype.addiontoken=function() {
		ai.call(this);
		if (unit.stress==0&&this.getrange(unit)<=3&&this.faction!=unit.faction) {
		    unit.addstress();
		    this.resolvehit(1);
		    log("["+unit.name+"] +1 stress for 1<code class='hit'></code> to "+this.name);
		    this.checkdead();
		}
	    }
	},
        skill: 7,
        points: 23,
        upgrades: [
            "Elite",
            "Turret",
            "Crew",
            "Illicit",
        ],
    },
    {
        name: "Palob Godalhi",
        unique: true,
	faction:"SCUM",
        unit: "HWK-290",
        begincombatphase: function() {
	    if (!this.dead) {
		var p=[];
		var i;
		p=this.selectnearbyunits(2,function(a,b) {return a.team!=b.team&&(a.canusefocus()||a.canuseevade()); });
		/* TODO: should be an option */
		if (p.length>0) {
		    p.push(this);
		    log("["+this.name+"] select a focus/evade token to take");
		    waitingforaction++;
		    this.resolveactionselection(p,function(k) {
			if (this!=p[k]) {
			    if (p[k].evade>0) { 
				p[k].removeevadetoken(); this.addevade(); 
				log("["+this.name+"] evade taken from "+p[k].name);
			    } else if (p[k].focus>0) { 
				p[k].removefocustoken(); this.addfocustoken(); 
				log("["+this.name+"] focus taken from "+p[k].name);
			    }
			}
			document.dispatchEvent(combatreadyevent()); 			
		    }.bind(this))
		}
	    }
	},    
	done:true,
        skill: 5,
        points: 20,
        upgrades: [
            "Elite",
            "Turret",
            "Crew",
            "Illicit",
        ],
    },
    {
        name: "Torkil Mux",
        unique: true,
	done:true,
        endactivationphase: function() {
	    if (!this.dead) {
		var p=this.gettargetableunits(2);
		var i;
		/* TODO: should stop attack actions */
		if (p.length>0) {
		    p.push(this);
		    log("<b>["+this.name+"] select a pilot to set its skill to 0 (or "+this.name+" to cancel)</b>");
		    waitingforaction++;
		    this.resolveactionselection(p,function(k) {
			if (this!=p[k]) {
			    p[k].oldskill=p[k].skill;
			    p[k].skill=0;
			    filltabskill();
			    p[k].show();
			    log("["+this.name+"] pilot skill 0 for "+p[k].name);
			    p[k].endcombatphase=function() {
				this.skill=this.oldskill;
				squadron.sort(function(a,b) {return b.skill-a.skill;});
				this.show();
			    }.bind(p[k]);
			}
			document.dispatchEvent(combatreadyevent()); 
		    }.bind(this))
		}
	    }
	},  
	faction:"SCUM",
        
        unit: "HWK-290",
        skill: 3,
        points: 19,
        upgrades: [
            "Turret",
            "Crew",
            "Illicit",
        ],
    },
    {
        name: "Spice Runner",
	faction:"SCUM",
	done:true,
        unit: "HWK-290",
        skill: 1,
        points: 16,
        upgrades: [
            "Turret",
            "Crew",
            "Illicit",
        ],
    },
    {
        name: "Commander Alozen",
        faction:"EMPIRE",
        unit: "TIE Advanced",
        unique: true,
	done:true,
        skill: 5,
        points: 25,
	begincombatphase: function() {
	    var p=this.gettargetableunits(1);
	    var i;
	    if (p.length>0) {
		waitingforaction++;
		p.push(this);
		log("<b>["+this.name+"] select target to lock</b>");
		this.resolveactionselection(p,function(k) {
		    if (this!=p[k]) {
			this.addtarget(p[k]);
			log("["+this.name+"] lock target "+p[k].name);
		    }
		    document.dispatchEvent(combatreadyevent()); 
		}.bind(this));
	    }
	},
        upgrades: [
            "Elite",
            "Missile",
        ],
    }
];
