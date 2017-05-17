#!/usr/bin/env python3
"""Generate the VSCode settings from the VSpaceCode config file."""

import json
import sys
from collections import OrderedDict

import yaml


def get_config():
    """Read, parse and return the VSpaceCode config file."""
    with open('config.yml', 'r') as file:
        return yaml.load(file)


def generate_settings(config):
    """Generate the VSCode settings from the config."""
    # Prepare result dictionnary
    result = OrderedDict()
    # Set leader configuration
    result["vim.leader"] = config["leader"]
    # Add individual bindings
    other_modes = list()
    for binding in config['bindings']:
        entry = OrderedDict()
        # Forcing keys as string otherwise VSCode fails to load correctly
        entry["before"] = [str(k) for k in binding["keys"]]
        entry["after"] = []
        entry["commands"] = [OrderedDict([('command', binding['command']),
                                          ('args', [])])]
        other_modes.append(entry)
    result["vim.otherModesKeyBindingsNonRecursive"] = other_modes
    return result


def generate_documentation(config):
    """Generate the RestructuredText documentation from the config."""
    # Prepare documentation content
    keys_list, desc_list = list(), list()
    for binding in config['bindings']:
        keys_list.append(' '
                         .join([':kbd:`{}`'.format(key)
                                for key in binding['keys']])
                         .replace('<', '').replace('>', ''))
        desc_list.append(binding['description'])
    keys_maxlen = max([len(keys) for keys in keys_list])
    desc_maxlen = max([len(desc) for desc in desc_list])
    separator = "=" * keys_maxlen + "  " + "=" * desc_maxlen + "\n"
    # Generate the documentation array
    result = ""
    result += separator
    result += "{:<{kw}}  {:<{dw}}\n".format("Key bindings",
                                            "Description",
                                            kw=keys_maxlen,
                                            dw=desc_maxlen)
    result += separator
    for keys, desc in zip(keys_list, desc_list):
        result += "{:<{kw}}  {:<{dw}}\n".format(keys, desc,
                                                kw=keys_maxlen,
                                                dw=desc_maxlen)
    result += separator
    return result


def usage():
    """Print the usage and exit."""
    print("Usage: {} <settings|documentation>".format(sys.argv[0]))
    exit(1)


def main():
    """Run the script."""
    # Check for arguments
    if len(sys.argv) != 2 or sys.argv[1] not in ['settings', 'documentation']:
        usage()
    # Get the command
    command = sys.argv[1]
    # Read the configuration
    config = get_config()
    # Generate accordingly to command
    if command == 'settings':
        settings = generate_settings(config)
        print(json.dumps(settings, indent=4))
    elif command == 'documentation':
        documentation = generate_documentation(config)
        print(documentation)


if __name__ == '__main__':
    main()
