import { motion } from 'framer-motion';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { getTeamData } from '@/data';

export function TeamPage() {
  useScrollToHash();
  const teamData = getTeamData();
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-background/70 to-background" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Meet Our{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              The brilliant minds driving innovation and excellence in robotics at NIT Patna
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professor In-charge — id added */}
      <section id="professor-in-charge" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Leadership</span>
            <h2 className="text-4xl font-heading font-bold mt-2 mb-2">Professor In-charge</h2>
            <p className="text-lg text-muted-foreground">Guiding our journey towards excellence</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full xl:max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {teamData.pi.map((advisor, index) => (
                <Card key={index} className="overflow-hidden group border-2 hover:border-primary/30 premium-shadow relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <motion.div
                    className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <CardContent className="p-0 relative z-10 flex flex-col sm:flex-row h-full">
                    <div className="relative overflow-hidden h-72 sm:h-auto sm:w-5/12 flex-shrink-0">
                      <div className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out">
                        <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 sm:w-7/12 relative group-hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-center">
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text group-hover:from-primary group-hover:to-primary/70 transition-all duration-500">{advisor.name}</h3>
                      </motion.div>
                      <motion.p className="text-primary font-semibold text-base sm:text-lg mb-2 group-hover:scale-105 transition-transform duration-300 origin-left" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>{advisor.role}</motion.p>
                      <motion.p className="text-xs sm:text-sm text-muted-foreground mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>{advisor.department}</motion.p>
                      <motion.p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>{advisor.bio}</motion.p>
                      <motion.div className="flex gap-2 sm:gap-3 mt-auto pt-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }}>
                        <motion.a whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }} href={`mailto:${advisor.email}`} className="p-3 rounded-xl bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"><Mail size={20} /></motion.a>
                        {advisor.social.linkedin && (
                          <motion.a whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }} href={advisor.social.linkedin} className="p-3 rounded-xl bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"><Linkedin size={20} /></motion.a>
                        )}
                        {advisor.social.twitter && (
                          <motion.a whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }} href={advisor.social.twitter} className="p-3 rounded-xl bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"><Twitter size={20} /></motion.a>
                        )}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Committee — id added */}
      <section id="executive-committee" className="section-padding scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Student Leaders</span>
            <h2 className="text-4xl font-heading font-bold mt-2 mb-2">Executive Committee</h2>
            <p className="text-lg text-muted-foreground">Leading with vision and dedication</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.executives.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 h-full">
                  <div className="relative h-80 overflow-hidden bg-muted">
                    <div className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent dark:from-background dark:via-background/50 dark:to-transparent opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center gap-2">
                      {member.social.github && (
                        <motion.a whileHover={{ scale: 1.15 }} href={member.social.github} className="p-2.5 rounded-xl glass hover:bg-primary hover:text-primary-foreground transition-all duration-300"><Github size={18} /></motion.a>
                      )}
                      {member.social.linkedin && (
                        <motion.a whileHover={{ scale: 1.15 }} href={member.social.linkedin} className="p-2.5 rounded-xl glass hover:bg-primary hover:text-primary-foreground transition-all duration-300"><Linkedin size={18} /></motion.a>
                      )}
                      {member.social.twitter && (
                        <motion.a whileHover={{ scale: 1.15 }} href={member.social.twitter} className="p-2.5 rounded-xl glass hover:bg-primary hover:text-primary-foreground transition-all duration-300"><Twitter size={18} /></motion.a>
                      )}
                      <motion.a whileHover={{ scale: 1.15 }} href={`mailto:${member.email}`} className="p-2.5 rounded-xl glass hover:bg-primary hover:text-primary-foreground transition-all duration-300"><Mail size={18} /></motion.a>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-primary font-semibold text-sm mb-1">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-4">{member.year}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team — id added */}
      <section id="core-team" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Core Members</span>
            <h2 className="text-4xl font-heading font-bold mt-2 mb-2">Core Team</h2>
            <p className="text-lg text-muted-foreground">Driving technical excellence and innovation</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamData.coreTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/30 group hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="flex items-center p-6 gap-5">
                      <div className="relative flex-shrink-0">
                        <img src={member.image} alt={member.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-300" />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg">{index + 1}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors truncate">{member.name}</h3>
                        <p className="text-primary text-sm font-semibold mb-1">{member.role}</p>
                        <p className="text-xs text-muted-foreground mb-2">{member.year}</p>
                        {member.description && <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{member.description}</p>}
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{member.domain}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Members — id added */}
      <section id="active-members" className="section-padding scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Community</span>
            <h2 className="text-4xl font-heading font-bold mt-2 mb-2">Active Members</h2>
            <p className="text-lg text-muted-foreground">Building the future, one project at a time</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {teamData.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/30 group hover:-translate-y-1">
                  <CardContent className="p-5 text-center">
                    <h3 className="font-heading font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{member.year}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{member.domain}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
