// import React, { useState, useEffect } from 'react';
"use client";
import { Menu, MessageCircle, Shield, Users, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Zap },
    { name: "How it Works", href: "#how-it-works", icon: MessageCircle },
    { name: "Privacy", href: "#privacy", icon: Shield },
    { name: "Login", href: "/sign-in", icon: Users },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              GhostPen
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="group relative px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <div className="w-6 h-6 relative">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <Icon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
          <div className="pt-4 mt-4 border-t border-white/10">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
