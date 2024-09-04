import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Bell, Lock, User, Globe, Palette } from 'lucide-react';
import React, { useEffect } from 'react';
import { usePageTitle } from '../../components/PageTitleContext';

const settingsCategories = [
  { title: "Notifications", icon: Bell, description: "Manage your email and push notifications" },
  { title: "Security", icon: Lock, description: "Update your password and security settings" },
  { title: "Account", icon: User, description: "Manage your account information" },
  { title: "Language", icon: Globe, description: "Change your language preferences" },
  { title: "Appearance", icon: Palette, description: "Customize the look and feel of your dashboard" },
];

export default function Settings() {
    const { setPageTitle } = usePageTitle();
  
    useEffect(() => {
      setPageTitle('Settings');
    }, [setPageTitle]);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold"></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4">
                <Icon className="h-6 w-6 text-indigo-500" />
                <div>
                  <CardTitle>{category.title}</CardTitle>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}