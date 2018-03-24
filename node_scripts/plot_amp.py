# import plotly.plotly as py
# import plotly.graph_objs as go
import wave
import numpy as np
import math
import struct
import pyaudio
import time
import urllib2
import os

node = "devin"



# Create random data with numpy

def plot_x_y(data_x, data_y):

	# Create a trace
	xy_data = []
	for y in data_y:
		trace = go.Scatter(
			x = data_x,
			y = y
		)

		xy_data += [trace]
	# print xy_data
	py.iplot(xy_data, filename='basic-line')


# initial setup
########################################
CHUNK = 512
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
RECORD_SECONDS = 100

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
				channels=CHANNELS,
				rate=RATE,
				input=True,
				frames_per_buffer=CHUNK)
print("* recording")
#########################################


def get_rms( block ):
	# RMS amplitude is defined as the square root of the 
	# mean over time of the square of the amplitude.
	# so we need to convert this string of bytes into 
	# a string of 16-bit samples...

	# we will get one short out for each 
	# two chars in the string.
	count = len(block)/2
	format = "%dh"%(count)
	shorts = struct.unpack( format, block )
	SHORT_NORMALIZE = (1.0/32768.0)
	# iterate over the block.
	sum_squares = 0.0
	for sample in shorts:
		# sample is a signed short in +/- 32768. 
		# normalize it to 1.0
		n = sample * SHORT_NORMALIZE
		sum_squares += n*n

	return math.sqrt( sum_squares / count )

def get_freq( block ):
	window = np.blackman(CHUNK*2)
	indata = np.array(wave.struct.unpack("%dh"%(len(data)/2),\
										 data))*window
	# Take the fft and square each value
	fftData=abs(np.fft.rfft(indata))**2
	# find the maximum
	which = fftData[1:].argmax() + 1
	# use quadratic interpolation around the max
	if which != len(fftData)-1:
		y0,y1,y2 = np.log(fftData[which-1:which+2:])
		x1 = (y2 - y0) * .5 / (2 * y1 - y2 - y0)
		# find the frequency and output it
		thefreq = (which+x1)*RATE/CHUNK
		return thefreq
	else:
		thefreq = which*RATE/CHUNK
		return thefreq

frames = []
freq_array = []
amp_array = []
time_x = []



current_freq_array = []
all_examples = []

loud = 0
for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
	data = stream.read(CHUNK)
	frames.append(data)

	# work with the data
	amplitude = get_rms(data)
	frequency = get_freq(data)
	#not the best way sorry :D
	#i think u did great :)
	# print "amplitude is", amplitude, "and the freq is", frequency
	if(amplitude > 0.40) and loud <= 0:
		print "a", loud
		my_command = ("(curl -k \"http://www.unertech.com/fox_ears/format_to_json.php?node="+ node + "&time=" + str(time.time()) + "&amp=" + str(amplitude) + "\")&")#.read()
		os.system(my_command)
		loud = 10
	if loud > 0:
		freq_array += [frequency]
		amp_array += [amplitude*10000]
		
		current_freq_array += [frequency]
	else:
		if len(current_freq_array) > 0:
			pass
		# 	all_examples += [[int(max(current_freq_array)), int(min(current_freq_array)), int(sum(current_freq_array)*1.0/len(current_freq_array))]]
			# print "ERROR IS: " + str(sum([abs(2330 - current_freq_array[0]), abs(417 - current_freq_array[1]), abs(1141 - current_freq_array[2])]))
		current_freq_array = []
		freq_array += [0]
		amp_array += [0]		
	time_x += [time.time()]
	loud -= 1

	# print "#"*int(amplitude/.004) + " "*(60-int(amplitude/.004))# + "#"*int(frequency/30)
	#record previous 5 frequency values

for i in all_examples:
	print i

# plot_x_y(time_x,[freq_array, amp_array])
print("* done recording")

stream.stop_stream()
stream.close()
p.terminate()