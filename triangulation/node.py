class Node:
    xPos = 0
    yPos = 0
    amp = 0
    time = 0

    def __init__(self, x, y, amp, time):
        self.xPos = x
        self.yPos = y

    def getX(self):
        return self.xPos
    
    def getY(self):
        return self.yPos

    def getAmp(self):
        return self.amp

    def getTime(self):
        return self.amp
    
    def setAmp(self, amp):
        self.amp = amp

    def setTime(self, time):
        self.time = time
