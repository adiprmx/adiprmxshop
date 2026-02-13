import { useState } from 'react';
import { MessageSquare, Send, Check, Sparkles, Palette, Clock, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function RequestSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    styleName: '',
    description: '',
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Halo ADIP RMX! 👋

Saya ingin request style khusus:

*Nama:* ${formData.name}
*Email:* ${formData.email}
*Nama Style:* ${formData.styleName}
*Deskripsi:* ${formData.description}

Mohon informasi jika style ini bisa dibuat. Terima kasih!`;

    const phoneNumber = '6285893523975';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setShowSuccessDialog(true);
    setFormData({ name: '', email: '', styleName: '', description: '' });
  };

  const features = [
    { icon: Palette, title: 'Custom Design', desc: 'Style sesuai kebutuhan' },
    { icon: Headphones, title: 'Konsultasi', desc: 'Diskusi gratis' },
    { icon: Clock, title: 'Cepat', desc: 'Pengerjaan 3-5 hari' },
  ];

  return (
    <section
      id="request"
      className="relative w-full py-24 lg:py-32 bg-[#faf8f5] overflow-hidden"
    >
      {/* Soft Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c8e6c9]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ffab91]/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#4db6ac]" />
              <span className="text-sm font-medium text-[#5a6c7d]">Custom Request</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2c3e50] mb-6">
              Butuh Style <span className="text-[#4db6ac]">Khusus?</span>
            </h2>

            <p className="text-lg text-[#7f8c8d] mb-10 max-w-lg">
              Jika Anda membutuhkan style atau preset yang tidak tersedia di katalog kami, 
              tim kami siap membantu mewujudkan style yang Anda inginkan.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-5 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md hover:border-[#4db6ac]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#4db6ac]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#4db6ac]/20 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-[#4db6ac]" />
                  </div>
                  <h4 className="font-semibold text-[#2c3e50] mb-1">{feature.title}</h4>
                  <p className="text-sm text-[#95a5a6]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="relative">
            {/* Soft Glow */}
            <div className="absolute -inset-4 bg-[#4db6ac]/5 blur-3xl rounded-3xl" />
            
            <div className="relative bg-white border border-black/5 rounded-3xl p-6 sm:p-8 shadow-lg shadow-black/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4db6ac]/10 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#4db6ac]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2c3e50]">Request Style</h3>
                  <p className="text-sm text-[#95a5a6]">Isi form di bawah ini</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5a6c7d] mb-2">
                      Nama Lengkap
                    </label>
                    <Input
                      type="text"
                      placeholder="Masukkan nama"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#f8f9fa] border border-black/8 focus:border-[#4db6ac]/50 text-[#2c3e50] placeholder:text-[#95a5a6] rounded-xl py-5 transition-all duration-300 focus:ring-4 focus:ring-[#4db6ac]/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5a6c7d] mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-[#f8f9fa] border border-black/8 focus:border-[#4db6ac]/50 text-[#2c3e50] placeholder:text-[#95a5a6] rounded-xl py-5 transition-all duration-300 focus:ring-4 focus:ring-[#4db6ac]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5a6c7d] mb-2">
                    Nama Style yang Diinginkan
                  </label>
                  <Input
                    type="text"
                    placeholder="Contoh: Style Yang Lagi Tren"
                    value={formData.styleName}
                    onChange={(e) => setFormData({ ...formData, styleName: e.target.value })}
                    required
                    className="w-full bg-[#f8f9fa] border border-black/8 focus:border-[#4db6ac]/50 text-[#2c3e50] placeholder:text-[#95a5a6] rounded-xl py-5 transition-all duration-300 focus:ring-4 focus:ring-[#4db6ac]/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#5a6c7d] mb-2">
                    Deskripsi Style
                  </label>
                  <Textarea
                    placeholder="Jelaskan detail style yang Anda inginkan..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-[#f8f9fa] border border-black/8 focus:border-[#4db6ac]/50 text-[#2c3e50] placeholder:text-[#95a5a6] rounded-xl resize-none transition-all duration-300 focus:ring-4 focus:ring-[#4db6ac]/10"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4db6ac] text-white hover:bg-[#3d9e94] py-6 text-base font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#4db6ac]/20"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Kirim Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-white border border-black/5 rounded-3xl max-w-md shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#2c3e50] flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              Request Terkirim!
            </DialogTitle>
            <DialogDescription className="text-[#7f8c8d]">
              Terima kasih telah mengirimkan request. Kami akan segera menghubungi Anda melalui WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowSuccessDialog(false)}
            className="w-full bg-[#4db6ac] text-white hover:bg-[#3d9e94] rounded-full"
          >
            Tutup
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
