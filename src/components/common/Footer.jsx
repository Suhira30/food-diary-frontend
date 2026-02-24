import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-secondary-bg border-t border-border-color mt-auto">
            <div className="container-custom py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-text-primary font-bold text-lg mb-3">Food Diary</h3>
                        <p className="text-text-secondary text-sm">
                            Track your restaurant experiences, discover new places, and share your culinary journey.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-text-primary font-bold text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-text-secondary hover:text-accent-green text-sm transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/restaurants" className="text-text-secondary hover:text-accent-green text-sm transition-colors">
                                    Restaurants
                                </Link>
                            </li>
                            <li>
                                <Link to="/subscription" className="text-text-secondary hover:text-accent-green text-sm transition-colors">
                                    Go Pro
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-text-primary font-bold text-lg mb-3">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-text-secondary hover:text-accent-green transition-colors">
                                <FaGithub size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border-color text-center">
                    <p className="text-text-secondary text-sm">
                        &copy; {new Date().getFullYear()} Food Diary. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
