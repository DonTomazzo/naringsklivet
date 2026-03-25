// pages/CourseFormPage.tsx
// ============================================
import CourseContactForm from '../components/CourseContactForm';

export default function CourseFormPage() {
  const handleSubmit = async (data: any) => {
    // Här kan du skicka data till ditt backend/Supabase
    console.log('Form data:', data);
    
    // Exempel med Supabase:
    // const { error } = await supabase
    //   .from('course_requests')
    //   .insert([data]);
    // 
    // if (error) throw error;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <CourseContactForm 
        onSubmit={handleSubmit}
        className="py-8"
      />
    </div>
  );
}
