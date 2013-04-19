//Unit conversion
mph=3600*100/2.54/12/5280

//Global stuff
deltatime=1/60

//Speeds
boostspeed=1000/mph//Maximum boost speed
maxspeed=1000/mph//Maximum overall speed
friction=0.00001
extfriction=0.9

//Energy usage
boostusage=0.004
collisionusage=0.001
maxcollisionspeed=300/mph//Any faster than this, and a collision won't use more than collisionusage energy

//Colors
orange=new THREE.Vector3(255,130,0)
cyan=new THREE.Vector3(100,100,255)
green=new THREE.Vector3(0,255,0)
red=new THREE.Vector3(255,0,0)

//Pushing rates
boostrate=0.1//How fast the boost takes you to boost speed
pushrate=0.04//How fast the push takes you to full speed

//Turning, braking, shifting, rolling
brakespeed=5//m/s^2 for braking
shiftdeg=0.4//Radians for shifting left and right
shiftspeed=0.9//m/s for shifting left and right
airshift=0.7//How much to decrease shifting while in the air

airturn=0.7//Ratio for how much slower to turn while in the air

rollrate=0.95//Ratio for rolling

//Floating, etc.
adhere=0.5
float=2
climb=0.5

//Camera stuff
minfov=75//Field of view
addfov=120-minfov//How much field of view to add
near=0.1//Near
far=10000000//Far
camsmooth=0.1

//Other stuff
slightly=0.01
trail=30
raycaster=new THREE.Raycaster()
collisionconst=1//Really small, but not 0
maxcollisions=4

function lerp(value,target,rate){
	return value+rate*(target-value)
}
function restrict(vec,plane){//Real simple.
	if(vec.clone().normalize().dot(plane.clone().normalize())<0){
		vec.projectOnPlane(plane)
	}
}
function addSpark(position,velocity){
	sparks.geometry.verticesNeedUpdate=true
	var fromend=sparks.geometry.vertices.pop()
	fromend.copy(position)
	fromend.velocity.set(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5)
	fromend.velocity.multiplyScalar(0.1)
	fromend.velocity.add(velocity)
	fromend.opacity=1
	fromend.color=Math.random()
	sparks.geometry.vertices.unshift(fromend)
}
function addBoostPad(position,rotation){
	var pad=new THREE.Mesh(
		resource.padGeo,
		resource.padMat
	)
	pad.position.copy(position)
	pad.rotation.copy(rotation)
	pad.boostpad=true
	boostpads.push(pad)
	scene.add(pad)
}