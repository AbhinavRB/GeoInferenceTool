from functools import reduce
import json

class Angle(object):
	"""docstring for Angle"""
	def __init__(self, id, value, lLine, rLine):
		self.id = id
		self.value = value
		self.lLine = lLine
		self.rLine = rLine
		self.known = False if(self.value < 0) else True
	def __str__(self):
		return str(self.id)+": "+str(self.value)
		

class Point(object):
	"""docstring for Point"""
	def __init__(self, label, x, y):
		self.label = label
		self.x = x
		self.y = y
	def __str__(self):
		return "("+self.label+", "+str(self.x)+", "+str(self.y)+")"
		

class Line(object):
	"""docstring for Line"""
	def __init__(self, label, start, end):
		self.label = label
		self.start = start
		self.end = end
		try: self.slope = (self.end.y - self.start.y)/(self.end.x - self.start.x)
		except ZeroDivisionException:
			self.slope = 1j
	def __str__(self):
		return self.label+": "+str(self.start)+", "+str(self.end)


def pointCheck(a, b):
	return a.x == b.x and a.y == b.y


def checkTriangle(l1, l2, l3):
	points = [(l1.start.x, l1.start.y), (l1.end.x, l1.end.y), (l2.start.x, l2.start.y), (l2.end.x, l2.end.y), (l3.start.x, l3.start.y), (l3.end.x, l3.end.y),]
	pset = set(points)
	if(len(pset) == 3):
		if(l1.slope != l2. slope and l1.slope != l3. slope and l2.slope != l3. slope):
			print('Triangle!!')
			return [l1, l2, l3]
		else:
			#print('Nope')
			return []
	else:
		#print('Nope')
		return []

def getAngles(tri):
	a = []
	for ang in angles:
		if(ang.lLine in tri and ang.rLine in tri):
			a.append(ang)
	return a

def triangleFinder(lines):
	for l1 in lines:
		lines.remove(l1)
		for l2 in [x for x in lines if pointCheck(x.start, l1.start) or pointCheck(x.end, l1.start)]:
			for l3 in lines:
				connect = checkTriangle(l1, l2, l3)
				if not connect:
					pass
				else:
					triangles.append(connect)
					for line in connect:
						print(str(line), end=" -- ")
					print()

def matchToTheorem():
	for tri in triangles:
		anglesInThis = getAngles(tri)
		for a in anglesInThis:
			if(not a.known):
				print(a.id, ":", "Angle sum property, ", [str(x) for x in anglesInThis if not x == a])
				a.value = 180 - (reduce(lambda x, y:x+y, [x.value for x in anglesInThis if not x == a]))
				print("Value =", a.value)


with open("datafile.json") as file:
	allData = json.load(file)
	dataPoints = allData['points']
	dataLines = allData['lines']
	dataAngles = allData['angles']

	points = []
	lines = []
	angles = []

	for p in dataPoints:
		points.append(Point(p['labe'], p['x'], p['y']))

	for l in dataLines:
		p = [x for x in points if x.label == l['start']['labe']][0]
		q = [x for x in points if x.label == l['end']['labe']][0]
		lines.append(Line(p.label+q.label, p, q))
	
	for a in dataAngles:
		l = [x for x in lines if x.label == a['leftline']['start']['labe']+a['leftline']['end']['labe']][0]
		r = [x for x in lines if x.label == a['rightline']['start']['labe']+a['rightline']['end']['labe']][0]
		id = l.label+r.label
		if(id[1] != id[2]):
			id = r.label+l.label
		id = id[0:2]+id[3]
		angles.append(Angle(id, int(a['value']), l, r))

triangles = []

triangleFinder(lines)
matchToTheorem()