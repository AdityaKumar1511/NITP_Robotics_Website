import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Projects', path: '/projects' },
  ],
  resources: [
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/Robotics-Club-NIT-Patna', label: 'GitHub', color: 'hover:bg-foreground hover:text-background' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/robotics-club-nit-patna', label: 'LinkedIn', color: 'hover:bg-[#0077B5] hover:text-white' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-[#1DA1F2] hover:text-white' },
  { icon: Instagram, href: 'https://www.instagram.com/robotics_club_nitp', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] hover:text-white' },
];

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="group relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1"
      >
        <span className="relative">
          {children}
          {/* Animated underline */}
          <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
        </span>
        {/* Arrow that slides in */}
        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary text-xs">→</span>
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card relative overflow-hidden">
      {/* Ambient top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center space-x-3 group w-fit">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
              >
                <img src="/assets/logo.png" alt="Robotics Club Logo" className="w-full h-full object-contain" />
              </motion.div>
              <div>
                <div className="font-heading font-bold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">Robotics Club</div>
                <div className="text-[11px] text-muted-foreground -mt-0.5 tracking-wide">NIT PATNA</div>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Pioneering robotics, AI, and automation at one of India's premier engineering institutions.
            </p>

            {/* Social icons with brand color reveals */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`w-9 h-9 rounded-lg bg-secondary flex items-center justify-center transition-all duration-300 ${social.color} relative overflow-hidden group`}
                  aria-label={social.label}
                >
                  <social.icon size={16} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <FooterLink key={link.path} to={link.path}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-5">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <FooterLink key={link.path} to={link.path}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-5">Contact</h3>
            <ul className="space-y-3">
              <li className="group flex items-start space-x-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors duration-300" />
                <span>NIT Patna, Ashok Rajpath, Patna, Bihar 800005</span>
              </li>
              <li className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                <Mail size={16} className="flex-shrink-0" />
                <a
                  href="mailto:robotics@nitp.ac.in"
                  className="relative group hover:text-foreground transition-colors duration-300"
                >
                  robotics@nitp.ac.in
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Robotics Club, NIT Patna. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            {import.meta.env.VITE_BUILTTEXT}
          </p>
        </div>
      </div>
    </footer>
  );
}
