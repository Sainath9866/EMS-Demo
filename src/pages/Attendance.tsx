import { useState, useRef, useEffect } from 'react'
import { 
  Clock, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  AlertCircle, 
  Camera, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Wifi,
  Shield,
  User,
  LogIn,
  LogOut,
  Video,
  VideoOff
} from 'lucide-react'
import { mockAttendanceData } from '../data/mockData'

export default function Attendance() {
  const [isPunchingIn, setIsPunchingIn] = useState(false)
  const [isPunchingOut, setIsPunchingOut] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanSuccess, setScanSuccess] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<'checked-in' | 'checked-out' | null>('checked-out')
  const [geofenceStatus, setGeofenceStatus] = useState<'in-office' | 'out-of-office'>('in-office')
  const [wifiStatus, setWifiStatus] = useState<'connected' | 'disconnected'>('connected')
  const [cameraActive, setCameraActive] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [todayAttendance, setTodayAttendance] = useState({
    checkIn: null as string | null,
    checkOut: null as string | null,
    totalHours: '0h 0m'
  })
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const attendanceHistory = [
    { date: '2024-12-05', checkIn: '09:15', checkOut: '18:30', hours: 8.5, status: 'present' },
    { date: '2024-12-04', checkIn: '09:00', checkOut: '18:00', hours: 8.0, status: 'present' },
    { date: '2024-12-03', checkIn: '09:30', checkOut: '18:45', hours: 8.25, status: 'late' },
    { date: '2024-12-02', checkIn: '09:00', checkOut: '17:30', hours: 7.5, status: 'present' },
    { date: '2024-12-01', checkIn: '-', checkOut: '-', hours: 0, status: 'absent' },
  ]

  // Initialize camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      })
      setStream(mediaStream)
      setCameraActive(true)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play()
          }
        }
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Camera access denied. Please allow camera access to use biometric attendance.')
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setCameraActive(false)
    }
  }

  // Capture photo for face recognition
  const capturePhoto = (): Promise<string> => {
    return new Promise((resolve) => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current
        const video = videoRef.current
        const context = canvas.getContext('2d')
        
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context?.drawImage(video, 0, 0)
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8)
        resolve(imageData)
      }
    })
  }

  // Calculate total hours worked
  const calculateTotalHours = (checkIn: string, checkOut: string | null) => {
    if (!checkIn || !checkOut) return '0h 0m'
    
    const [inHour, inMin] = checkIn.split(':').map(Number)
    const [outHour, outMin] = checkOut.split(':').map(Number)
    
    const checkInMinutes = inHour * 60 + inMin
    const checkOutMinutes = outHour * 60 + outMin
    const totalMinutes = checkOutMinutes - checkInMinutes
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    
    return `${hours}h ${minutes}m`
  }

  // Update total hours when check-in/out changes
  useEffect(() => {
    if (todayAttendance.checkIn) {
      const total = calculateTotalHours(todayAttendance.checkIn, todayAttendance.checkOut)
      setTodayAttendance(prev => ({ ...prev, totalHours: total }))
    }
  }, [todayAttendance.checkIn, todayAttendance.checkOut])

  const handleBiometricScan = async (action: 'punch-in' | 'punch-out') => {
    // Start camera if not active
    if (!cameraActive) {
      await startCamera()
      // Wait a moment for camera to initialize
      setTimeout(() => {
        performBiometricScan(action)
      }, 1000)
    } else {
      performBiometricScan(action)
    }
  }

  const performBiometricScan = async (action: 'punch-in' | 'punch-out') => {
    setIsScanning(true)
    setScanSuccess(false)
    
    try {
      // Capture photo for face recognition
      const photoData = await capturePhoto()
      console.log('Photo captured for face recognition:', photoData.substring(0, 50) + '...')
      
      // Simulate face recognition processing
      setTimeout(() => {
        setIsScanning(false)
        setScanSuccess(true)
        
        // Get current time
        const now = new Date()
        const timeString = now.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        })
        
        // Simulate successful verification
        setTimeout(() => {
          if (action === 'punch-in') {
            setCurrentStatus('checked-in')
            setTodayAttendance(prev => ({ 
              ...prev, 
              checkIn: timeString,
              checkOut: null 
            }))
            setIsPunchingIn(false)
            console.log(`Punch In successful at ${timeString}`)
          } else {
            setCurrentStatus('checked-out')
            setTodayAttendance(prev => ({ 
              ...prev, 
              checkOut: timeString 
            }))
            setIsPunchingOut(false)
            console.log(`Punch Out successful at ${timeString}`)
          }
          setScanSuccess(false)
          
          // Stop camera after successful scan
          setTimeout(() => {
            stopCamera()
          }, 2000)
        }, 1500)
      }, 2000)
    } catch (error) {
      console.error('Error during biometric scan:', error)
      setIsScanning(false)
      setScanSuccess(false)
    }
  }

  // Ensure video plays when stream is available
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play()
    }
  }, [stream])

  // Cleanup camera on component unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Biometric face recognition attendance system</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Geofence Status */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            geofenceStatus === 'in-office' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">
              {geofenceStatus === 'in-office' ? 'In Office' : 'Out of Office'}
            </span>
          </div>
          
          {/* WiFi Status */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            wifiStatus === 'connected' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
          }`}>
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">
              {wifiStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Biometric Attendance Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Face Recognition Scanner */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Biometric Attendance</h2>
            <p className="text-gray-600">Use face recognition to punch in/out</p>
          </div>

          {/* Camera Preview Area */}
          <div className="relative mb-8">
            <div className={`w-full h-64 rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
              isScanning ? 'border-blue-500' : 
              scanSuccess ? 'border-green-500' : 
              cameraActive ? 'border-gray-300' : 'border-dashed border-gray-300'
            }`}>
              {cameraActive ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Hidden canvas for photo capture */}
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Overlay states */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 relative">
                          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-white font-medium">Scanning your face...</p>
                        <p className="text-sm text-blue-100 mt-1">Please look at the camera</p>
                      </div>
                    </div>
                  )}
                  
                  {scanSuccess && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                        <p className="text-white font-medium">Verification Successful!</p>
                        <p className="text-sm text-green-100 mt-1">Processing attendance...</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Ready for Biometric Scan</p>
                    <p className="text-sm text-gray-400 mt-1">Click Punch In/Out to activate camera</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Security Indicators */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4 text-blue-500" />
                <span>Liveness Detection</span>
              </div>
            </div>
          </div>

          {/* Punch In/Out Buttons */}
          <div className="space-y-4">
            {currentStatus === 'checked-out' ? (
              <button
                onClick={() => {
                  setIsPunchingIn(true)
                  handleBiometricScan('punch-in')
                }}
                disabled={isScanning || geofenceStatus === 'out-of-office'}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
              >
                <div className="flex items-center justify-center space-x-3">
                  <LogIn className="h-6 w-6" />
                  <span>Punch In</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsPunchingOut(true)
                  handleBiometricScan('punch-out')
                }}
                disabled={isScanning}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
              >
                <div className="flex items-center justify-center space-x-3">
                  <LogOut className="h-6 w-6" />
                  <span>Punch Out</span>
                </div>
              </button>
            )}

            {/* Current Status */}
            <div className={`text-center py-3 px-4 rounded-xl ${
              currentStatus === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                {currentStatus === 'checked-in' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span className="font-medium">
                  {currentStatus === 'checked-in' ? 'Currently Checked In' : 'Currently Checked Out'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Stats & Info */}
        <div className="space-y-6">
          {/* Today's Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Attendance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Check In Time</span>
                <span className="font-semibold text-gray-900">
                  {todayAttendance.checkIn || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Check Out Time</span>
                <span className="font-semibold text-gray-900">
                  {todayAttendance.checkOut || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Hours</span>
                <span className="font-semibold text-gray-900">
                  {todayAttendance.totalHours}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentStatus === 'checked-in' 
                    ? 'bg-green-100 text-green-700' 
                    : currentStatus === 'checked-out' && todayAttendance.checkIn
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {currentStatus === 'checked-in' 
                    ? 'Checked In' 
                    : currentStatus === 'checked-out' && todayAttendance.checkIn
                    ? 'Checked Out'
                    : 'Not Started'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">This Week</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">90%</div>
                <div className="text-sm text-gray-600">On Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8.6h</div>
                <div className="text-sm text-gray-600">Avg Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">Present Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Leaves</div>
              </div>
            </div>
          </div>

          {/* Geofence Warning */}
          {geofenceStatus === 'out-of-office' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-red-700">Outside Office Area</p>
                  <p className="text-sm text-red-600">You must be within the office geofence to punch in.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Recent Attendance History</h2>
          <p className="text-sm text-gray-500 mt-1">Your last 5 attendance records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {attendanceHistory.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.hours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-700' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Face ID</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
