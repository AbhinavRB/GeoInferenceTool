from functools import reduce
import math
import json
class Angle(object):
	"""docstring for Angle"""
	def __init__(self, id, value, lLine, rLine):
		self.id = id
		self.value = value
		self.lLine = lLine
		self.rLine = rLine
		self.known = False if(self.value < 0) else True
	def setValue(self, val):
		self.value = val
		self.known = True
	def __str__(self):
		return str(self.id)
		

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

def findSomeAngles():
	for p in points:
		linesOnThis = [l for l in lines if (l.start == p or l.end == p)]
		anglesToCheck = [a for a in angles if a.rLine in linesOnThis and a.lLine in linesOnThis]
		for ang in anglesToCheck:
			if(not ang.known):
				print(ang.id, ":", "Angles around a point, ", [str(x) for x in anglesToCheck if not x == ang])
				ang.setValue(360 - reduce(lambda x, y: x+y, [x.value for x in anglesToCheck if not x == ang]))
				print(ang.value)

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


findSomeAngles()