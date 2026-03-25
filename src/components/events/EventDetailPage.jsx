import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Video, Mail, DollarSign, ArrowLeft } from 'lucide-react';

function EventDetailPage({ event, onBack }) {
  const categoryColors = {
    webinar: 'bg-blue-500',
    workshop: 'bg-purple-500',
    training: 'bg-green-500',
    meeting: 'bg-orange-500',
    conference: 'bg-red-500'
  };

  const categoryLabels = {
    webinar: 'Webinar',
    workshop: 'Workshop',
    training: 'Utbildning',
    meeting: 'Möte',
    conference: 'Konferens'
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('sv-SE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const categoryColor = categoryColors[event.category] || 'bg-blue-500';
  const categoryLabel = categoryLabels[event.category] || 'Event';
  const spotsLeft = event.maxParticipants - (event.participants?.length || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.thumbnailUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white mb-6 hover:text-orange-400 transition-colors"
            >
              <ArrowLeft size={20} />
              Tillbaka till events
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className={`${categoryColor} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                {categoryLabel}
              </span>
              {event.isFree && (
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Gratis
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span className="font-medium">{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span className="font-medium">{event.startTime} - {event.endTime}</span>
              </div>
              {event.meetingType === 'physical' ? (
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span className="font-medium">{event.location}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Video size={20} />
                  <span className="font-medium">Online Event</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Bootcamp Events Description
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-4">
                  {event.description}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.
                </p>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                25 That Prevent Job Seekers From Overcoming Failure
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. Sed consequat justo non mauris pretium at tempor justo sodales.
                </p>
                <p>
                  Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white rounded-xl shadow-xl p-8 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-orange-400">Event Detail</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-orange-400" />
                    <span className="text-slate-300">Start Date</span>
                  </div>
                  <span className="font-semibold">{formatDate(event.startDate).split(' ').slice(1).join(' ')}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-400" />
                    <span className="text-slate-300">Start Time</span>
                  </div>
                  <span className="font-semibold">{event.startTime}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-orange-400" />
                    <span className="text-slate-300">End Date</span>
                  </div>
                  <span className="font-semibold">
                    {event.endDate ? formatDate(event.endDate).split(' ').slice(1).join(' ') : formatDate(event.startDate).split(' ').slice(1).join(' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-400" />
                    <span className="text-slate-300">End Time</span>
                  </div>
                  <span className="font-semibold">{event.endTime}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    {event.meetingType === 'physical' ? (
                      <MapPin size={18} className="text-orange-400" />
                    ) : (
                      <Video size={18} className="text-orange-400" />
                    )}
                    <span className="text-slate-300">Location</span>
                  </div>
                  <span className="font-semibold text-right">
                    {event.meetingType === 'physical' ? event.location : 'Online'}
                  </span>
                </div>

                {!event.isFree && (
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <DollarSign size={18} className="text-orange-400" />
                      <span className="text-slate-300">Price</span>
                    </div>
                    <span className="font-semibold">{event.price} SEK</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-orange-400" />
                    <span className="text-slate-300">Available Spots</span>
                  </div>
                  <span className="font-semibold">{spotsLeft} / {event.maxParticipants}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-bold text-lg shadow-lg"
              >
                Book Now
              </motion.button>

              {/* Instructor Info */}
              <div className="mt-8 pt-8 border-t border-slate-700">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Instruktör</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {event.instructorName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{event.instructorName}</div>
                    <div className="text-sm text-slate-400 flex items-center gap-1">
                      <Mail size={14} />
                      {event.instructorEmail}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;